import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  const course = useSelector(state =>
    state.courses.courses.find(course => course.id === parseInt(id))
  );

  const [expandedWeeks, setExpandedWeeks] = useState({});

  const toggleWeek = (week) => {
    setExpandedWeeks(prevState => ({
      ...prevState,
      [week]: !prevState[week]
    }));
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-details-container">
      <div className="course-header">
        <h1 className="course-title">{course.name}</h1>
        <p className="course-instructor">by {course.instructor}</p>
      </div>
      <div className="course-content">
        <div className="course-sidebar">
          <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
          <div className="course-info">
            <p><strong>Enrollment Status:</strong> {course.enrollmentStatus}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <p><strong>Schedule:</strong> {course.schedule}</p>
            <p><strong>Location:</strong> {course.location}</p>
            <p><strong>Pre-requisites:</strong> {course.prerequisites.join(', ')}</p>
            <button className="enroll-button">Enroll</button>
            <div className="student-list">
              <strong>Students:</strong>
              <ul>
                {course.students.map((student, index) => (
                  <li key={index}>{student.name} ({student.email})</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="course-details">
          <p style={{fontSize:'20px'}}><strong>Description:</strong> {course.description}</p>
          <div>
            <strong>Syllabus:</strong>
            <ul className="syllabus-list">
              {course.syllabus.map(week => (
                <li key={week.week} className="syllabus-item" onClick={() => toggleWeek(week.week)}>
                  <strong>
                    Week {week.week}: {week.topic}
                  </strong>
                  {expandedWeeks[week.week] && <p>{week.content}</p>}
                  <div className="dropdown-icon">▼</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
