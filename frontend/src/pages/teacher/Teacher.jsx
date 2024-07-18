import React, { useState, useEffect } from 'react';
import './Teacher.css';
import axios from 'axios';
import dayjs from 'dayjs';
import moment from 'moment'
import {useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Teacher = ({ teacherId }) => {
  const [courses, setCourses] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch courses for the teacher using your API
    const fetchCourses = async () => {
      try {
        console.log("teacherId", teacherId);
        const response = await axios.get(`http://localhost:8088/course/teacher/${teacherId}`); // Adjust URL as per your backend setup
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [teacherId]);

  const updateCourseStatus = async (courseId, status) => {
    console.log("courseId", courseId);
    try {
      const response = await axios.put(`http://localhost:8088/course/teacher/${courseId}`, { status });
      setCourses(courses.map(course => (course._id === courseId ? response.data : course)));
    } catch (err) {
      console.error('Error updating course status:', err);
    }
  };

  const handleStartDate= (date) => {
    setStartDate(date);
    if (endDate.isBefore(date)) {
      setEndDate(date);
    }
  };

  const handleEndDate = (date) => {
    if (date.isAfter(startDate)) {
      setEndDate(date);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="teacher-dashboard">
      <h2>Teacher Dashboard - My Classes</h2>
      <button className="logout-button" onClick={handleLogout}>
       Logout
     </button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From"
          value={startDate}
          onChange={handleStartDate}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="To"
          value={endDate}
          onChange={handleEndDate}
          minDate={startDate}
        />
      </LocalizationProvider>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-item">
            <h3>{course.name}</h3>
            <p>Date:{course.date} </p>
            <p>Start Time: {course.startTime}</p>
            <p>End Time: {course.endTime}</p>
            <p>Status: {course.status}</p>
            {course.status === 'pending' && (
              <div>
                <button onClick={() => updateCourseStatus(course._id, 'accepted')}>Accept</button>
                <button onClick={() => updateCourseStatus(course._id, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teacher;
