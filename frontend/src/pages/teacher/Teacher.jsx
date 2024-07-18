import React, { useState, useEffect } from 'react';
import './Teacher.css';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const Teacher = ({ teacherId }) => {
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day'));
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(startDate, endDate); // Initial fetch with default dates
  }, [teacherId, startDate, endDate]);

  const fetchCourses = async (start, end) => {
    try {
      const formattedStartDate = moment(start).format('YYYY-MM-DD');
      const formattedEndDate = moment(end).format('YYYY-MM-DD');
      console.log("Fetching courses from:", formattedStartDate, "to:", formattedEndDate);

      const response = await axios.get(`http://localhost:8088/course/teacher/${teacherId}`, {
        params: {
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      });

      setCourses(response.data);
      setAllCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const updateCourseStatus = async (courseId, status) => {
    try {
      const response = await axios.put(`http://localhost:8088/course/teacher/${courseId}`, { status });
      setCourses(courses.map(course => (course._id === courseId ? response.data : course)));
    } catch (err) {
      console.error('Error updating course status:', err);
    }
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    if (endDate.isBefore(date)) {
      setEndDate(date.add(1, 'day'));
    }
    fetchCourses(date, endDate); // Fetch courses when start date changes
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    if (date.isBefore(startDate)) {
      setStartDate(date);
    }
    fetchCourses(startDate, date); // Fetch courses when end date changes
  };

  const handleSelect = (date) => {
    const filtered = allCourses.filter((course) => {
      const courseDate = moment(course.date).format('YYYY-MM-DD');
      return moment(courseDate).isSameOrAfter(startDate) && moment(courseDate).isSameOrBefore(endDate);
    });
    setCourses(filtered);
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
          renderInput={(params) => <input {...params} />}
        />
        <DatePicker
          label="To"
          value={endDate}
          onChange={handleEndDate}
          minDate={startDate}
          renderInput={(params) => <input {...params} />}
        />
        <button onClick={handleSelect}>Select</button> {/* Button to trigger date range filter */}
      </LocalizationProvider>

      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-item">
            <h3>{course.name}</h3>
            <p>Date: {moment(course.date).format('YYYY-MM-DD')}</p>
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
