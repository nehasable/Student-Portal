import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './CourseForm.css';

const CourseForm = ({ studentId }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(30, 'minute'));
  const [teacherName, setTeacherName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [loading,setLoading]=useState(false);               //true when clicked
  console.log(name,studentId)
  useEffect(() => {
    setEndTime(startTime.add(30, 'minute'));
  }, [startTime]);

  useEffect(() => {
    const fetchTeachers = async () => {
      if (teacherName) {
        try {
          const response = await axios.get('http://localhost:8088/teachers', {
            params: { name: teacherName },
          });
          setTeachers(response.data);
        } catch (error) {
          console.error('Error fetching teachers:', error);
        }
      } else {
        setTeachers([]);
      }
    };

    fetchTeachers();
  }, [teacherName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (endTime.isBefore(startTime)) {
      setError('End time must be greater than start time.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8088/course', {
        name,
        startTime: startTime.format('HH:mm'),
        endTime: endTime.format('HH:mm'),
        teacherName,
        studentId,
        
      });
      console.log(response.data);
      setName('');
      setStartTime(dayjs());
      setEndTime(dayjs().add(30, 'minute'));
      setTeacherName('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating course');
    }finally {
      setLoading(false); // set loading to false
    }
  };

  const handleTeacherClick = (name) => {
    setTeacherName(name);
    setTeachers([]); // clear the list after selecting a teacher
  };

  return (
    <div className="course-form">
      <div className="home">
        <h1>Book a Course</h1>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
          <label>
            Course Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(time) => setStartTime(time)}
              renderInput={(params) => <input {...params} />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(time) => setEndTime(time)}
              minTime={startTime.add(30, 'minute')}
              renderInput={(params) => <input {...params} />}
            />
          </LocalizationProvider>
          <label>
            Teacher Name:
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Search by teacher name"
            />
          </label>
          <div>
            {teachers.map((teacher) => (
              <div
                key={teacher._id}
                onClick={() => handleTeacherClick(teacher.name)}
                className="teacher-item"
            
              >
                {teacher.name}
              </div>
            ))}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
