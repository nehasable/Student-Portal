import React, { useState, useEffect } from 'react';
import './Teacher.css';
import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate,Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

const Teacher = ({ teacherId }) => {
  const [courses, setCourses] = useState([]);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day'));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);
  const itemsPerPage = 3;
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses(startDate, endDate, currentPage, searchItem); // initial fetch with values
  }, [teacherId, startDate, endDate, currentPage]);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      fetchCourses(startDate, endDate, currentPage, searchItem);
    }, 500);

    setDebounceTimer(newTimer);
    // Cleanup timer on component unmount or searchItem change
    return () => clearTimeout(newTimer);
  }, [searchItem]);

  const fetchCourses = async (start, end, page, search) => {
    try {
      const formattedStartDate = moment(start.toDate()).format('YYYY-MM-DD');
      const formattedEndDate = moment(end.toDate()).format('YYYY-MM-DD');
      console.log("Fetching courses from:", formattedStartDate, "to:", formattedEndDate, "page:", page, "search:", search);

      const response = await axios.get(`http://localhost:8088/course/teacher/${teacherId}`, {
        params: {
          search,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          page,
          limit: itemsPerPage
        },
      });

      setCourses(response.data.courses || []);
      setTotalPages(response.data.totalPages || 1);
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
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    if (date.isBefore(startDate)) {
      setStartDate(date);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <div className="teacher-dashboard">
      <h2>Teacher Dashboard - My Classes</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <Link className="link"to="/teacher/classes">Total Classes</Link> 
      <div>
        <label>Search:</label>
        <input
          type="text"
          id="search"
          value={searchItem}
          onChange={handleSearchChange}
          placeholder="Search by student name or mobile number"
        />
      </div>
      
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
      </LocalizationProvider>

      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-item">
            <h3>{course.name}</h3>
            <p>Student: {course.students?.name}</p>
            <p>Mobile: {course.students?.mobileNo}</p>
            <p>Date: {moment(new Date(course.date)).format('YYYY-MM-DD')}</p>
            <p>Start Time: {course.startTime}</p>
            <p>End Time: {course.endTime}</p>
            <p>Status: {course.status}</p>
            {course.status === 'pending' && (
              <div className='buttons'>
                <button onClick={() => updateCourseStatus(course._id, 'accepted')}>Accept</button>
                <button onClick={() => updateCourseStatus(course._id, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Teacher;
