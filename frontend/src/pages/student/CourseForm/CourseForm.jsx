import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment';
import './CourseForm.css';
import { styled } from '@mui/material';

const CourseForm = ({ studentId }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs().add(30, 'minute'));
  const [teacherName, setTeacherName] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [date, setDate] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = {
    autocomplete: {
      width: '300px',
      margin: '20px',
    },
    textField: {
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
    },
  };
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
      const formattedDate = moment(new Date(date)).format('YYYY-MM-DD');
      const response = await axios.post('http://localhost:8088/course', {
        name,
        date: formattedDate,
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
      setDate(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form">
      <div className="home">
        <h1>Book a Course</h1>
        <div className='form'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params}
             />}
            />
          </LocalizationProvider>
          <label className='name'>
           
            <input
              type="text"
              placeholder='Course Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{width:"300px",height:"50px",borderRadius:"4px",cursor:'pointer', border: "1px solid #ccc",fontSize:"16px"}}
            />
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Start Time"
              value={startTime}
              onChange={(time) => setStartTime(time)}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="End Time"
              value={endTime}
              onChange={(time) => setEndTime(time)}
              minTime={startTime.add(30, 'minute')}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <label>
           
            <Autocomplete
           
              freeSolo
              options={teachers.map((teacher) => teacher.name)}
              onInputChange={(event, newInputValue) => {
                setTeacherName(newInputValue);
              
              }}
              style={styles.autocomplete}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search teacher"
                  variant="outlined"
                />
              )}
            />
          </label>
          <button type="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
