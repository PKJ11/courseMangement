import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../store/courseSlice';
import { Link } from 'react-router-dom';
import './CourseList.css'; 

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = searchTerm
    ? courses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : courses;

  return (
    <div className="course-list-container">
      <div className="header">
        <h1>Most engaging classes of all time</h1>
        <input
          type="text"
          placeholder="Search "
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="course-list">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <Link to={`/course/${course.id}`}>
              <div className="course-image-container">
                <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
              </div>
              <div className="course-info">
                <h3>{course.name}</h3>
                <p>{course.instructor}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
