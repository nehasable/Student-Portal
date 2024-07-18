import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/Navbar';

const Classes = ({ studentId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!studentId) {
        console.error('Invalid student ID');
        return;
      }

      console.log('Student ID:', studentId); // Log studentId for debugging

      try {
        const response = await axios.get(`http://localhost:8088/course/${studentId}`);
        console.log('Fetched courses:', response.data);
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, [studentId]);

  return (
    <div>
      <Navbar/>
      <h3>All Classes</h3>
      <h2>My Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;