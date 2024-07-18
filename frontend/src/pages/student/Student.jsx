
import React from 'react';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm/CourseForm';
import Classes from './Classes/Classes';
import './Student.css'
import Navbar from '../../components/Navbar';
const Student = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('user'));
  const studentId = student ? student._id : null;


  return (
    <div className='student-container'> 
    <Navbar/>
      <div className="content">
        {/* <Routes>
          <Route path="/" element={<Navigate to="/book" />} />
          
        </Routes> */}
        <CourseForm studentId={studentId} />
        
      </div>
    </div>
  );
};

export default Student;
