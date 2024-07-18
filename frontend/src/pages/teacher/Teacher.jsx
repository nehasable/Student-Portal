import React,{useState,useEffect} from 'react'
import './Teacher.css'
import axios from 'axios';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Teacher = ({teacherId}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses for the teacher using your API
    const fetchCourses = async () => {
      try {
        console.log("teacherId",teacherId)
        const response = await axios.get(`http://localhost:8088/course/teacher/${teacherId}`); // Adjust URL as per your backend setup
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const updateCourseStatus = async (courseId, status) => {
    console.log("courseId",courseId)
    try {
      const response = await axios.put(`http://localhost:8088/course/teacher/${courseId}`, { status });
      setCourses(courses.map(course => (course._id === courseId ? response.data : course)));
    } catch (err) {
      console.error('Error updating course status:', err);
    }
  };
  return (

    <div className="teacher-dashboard">
   
    <h2>Teacher Dashboard - My Classes</h2>

    <div className="courses-list">
      {courses.map((course) => (
        <div key={course._id} className="course-item">
          <h3>{course.name}</h3>
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
    {/* <div className='days'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker />
    </LocalizationProvider>
      </div> */}
  </div>
);
};

export default Teacher
