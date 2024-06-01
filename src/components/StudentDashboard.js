import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllCourses,
  setEnrolledCourses,
  markCourseCompleted,
} from "../store/studentSlice";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Sidebar from "./SideBar";
import { Box, CardContent, Typography } from "@mui/material";
import ProgressImageCard from "./ImageCard";
import "./StudentDashboard.css";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StudentDashboard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector((state) => state.students);
  const { allCourses, enrolledCourses, status, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllCourses());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      const studentCourses = allCourses
        .filter((course) =>
          course.students.some((student) => student.id.toString() === id)
        )
        .map((course) => ({
          ...course,
          progress: course.students.find(
            (student) => student.id.toString() === id
          ).progress,
          completed:
            course.students.find((student) => student.id.toString() === id)
              .progress === 100,
        }));
      dispatch(setEnrolledCourses(studentCourses));
    }
  }, [status, id, allCourses, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const progressData = {
    labels: enrolledCourses.map((course) => course.name.split(' ')[0]),
    datasets: [
      {
        label: "Progress",
        data: enrolledCourses.map((course) => course.progress),
        borderColor: "rgba(255, 165, 0, 1)",
        backgroundColor: "#fff",
        fill: true,
        color: "#fff",
      },
    ],
  };
  
  const handleMarkAsComplete = (courseId) => {
    dispatch(markCourseCompleted(courseId));
  };

  console.log("details : ", details);

  console.log(id) ;

  return (
    <Box className="dashboard">
      <Sidebar className="sidebar" id ={id} />
      <Box className="main-content">
        <div className="chart-card">
          <CardContent className="card-content">
            <Typography className="card-title" variant="h6">
               Course Progress
            </Typography>
            <Line data={progressData} />
          </CardContent>
        </div>
        <div className="image-cards">
          {enrolledCourses.map((course) => (
            <ProgressImageCard
              key={course.id}
              course={course}
              onMarkAsComplete={handleMarkAsComplete}
            />
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
