import React, { useState,useEffect } from 'react';
import axios from 'axios';

const CourseForm = ({ fetchCourses, studentId }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/course/${studentId}`);
        console.log(studentId)
        setCourses(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8088/course', {
        name,
        startTime,
        endTime,
        teacherName,
        studentId,
      });
      console.log(response.data);
      fetchCourses(); // refresh the list of booked courses
    } catch (error) {
      setError(error.response?.data?.message );
    }
  };

  return (
    <div className="course-form">
      <h2>Book a Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        <label>
          Teacher Name:
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
        {error && <p>{error}</p>}
      </form>
      <h2>My Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>{course.name} - {course.status}</li>
        ))}
      </ul>

    </div>
  );
};

export default CourseForm;

