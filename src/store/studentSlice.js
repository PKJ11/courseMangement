// src/store/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllCourses = createAsyncThunk(
  'students/fetchAllCourses',
  async () => {
    const response = await axios.get('http://localhost:5000/courses');
    return response.data;
  }
);

export const fetchStudentDetails = createAsyncThunk(
  'students/fetchStudentDetails',
  async (studentId) => {
    try {
      const response = await axios.get('http://localhost:5000/courses');
      let studentDetails = {};

      // Iterate over each course
      response.data.forEach(course => {
        // Iterate over each student in the course
        course.students.forEach(student => {
          // If the student id matches the requested id, store their details
          if (student.id === parseInt(studentId)) {
            studentDetails = {
              id: student.id,
              name: student.name,
              email: student.email
            };
          }
        });
      });

      return studentDetails;
    } catch (error) {
      throw error;
    }
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    allCourses: [],
    enrolledCourses: [],
    studentDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    markCourseCompleted: (state, action) => {
      const courseId = action.payload;
      const course = state.enrolledCourses.find(course => course.id === courseId);
      if (course) {
        course.completed = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allCourses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.studentDetails = action.payload;
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setEnrolledCourses, markCourseCompleted } = studentSlice.actions;

export default studentSlice.reducer;
