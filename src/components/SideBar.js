import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import "./Sidebar.css";
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
    const id = props.id;
    const { enrolledCourses } = useSelector(state => state.students);
    const [studentName, setStudentName] = useState(null);
    const [studentEmail, setStudentEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let student = null;
            for (let i = 0; i < enrolledCourses.length; i++) {
                const course = enrolledCourses[i];
                for (let j = 0; j < course.students.length; j++) {
                    const currentStudent = course.students[j];
                    if (currentStudent.id.toString() === id) {
                        student = currentStudent;
                        break; // Stop further iteration once student is found
                    }
                }
                if (student) {
                    break; // Stop further iteration once student is found
                }
            }
            if (student) {
                setStudentName(student.name);
                
                setStudentEmail(student.email);
            }
        };

        fetchData();
    }, [id, enrolledCourses]);
    

    return (
        <Box className="sidebar">
            <Avatar
                sx={{ width: 100, height: 100 }}
                src="https://example.com/avatar.jpg"
                alt="Profile Picture"
            />
            <Typography
                variant="h5"
                className="username"
                style={{ marginTop: "20px" }}
            >
                {studentName}
            </Typography>
            <Typography variant="subtitle1" className="userinfo">
                {studentEmail}
            </Typography>

            <Box className="tags">
                <Box className="tag">Data Structures and Algorithms</Box>
                <Box className="tag">C++</Box>
                <Box className="tag">html</Box>
                <Box className="tag">css</Box>
                <Box className="tag">javascript</Box>
            </Box>
            <Box className="community-stats">
                <Typography>
                    No. of enrolledCourses  :  {enrolledCourses.length}
                </Typography>
                <p>
                    <strong>Instructors : </strong>
                </p>
                <Box>
                    {enrolledCourses.map((course, index) => (
                        <Typography key={course.id}>
                            {index + 1}. {course.instructor}
                        </Typography>
                    ))}
                </Box>
                <p>
                    <strong>Courses : </strong>
                </p>
                <Box>
                    {enrolledCourses.map((course, index) => (
                        <Typography key={course.id}>
                            {index + 1}. {course.name}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
