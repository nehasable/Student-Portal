import React from 'react'
import TotalCourses from './TotalCourses'

const Courses = () => {
    const token = localStorage.getItem('token');
    const teacher = JSON.parse(localStorage.getItem('user'));
    const teacherId = teacher ? teacher._id : null;
  return (
    <div>
       <TotalCourses token={token} teacherId={teacherId}/>
    </div>
  )
}

export default Courses
