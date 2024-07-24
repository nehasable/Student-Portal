import React from 'react'
import Teacher from './Teacher'
import TotalCourses from './TotalCourses';

const TeacherCourses = ({date}) => {
    const teacher = JSON.parse(localStorage.getItem('user'));
  const teacherId = teacher ? teacher._id : null;

  return (
    <div>
      <Teacher teacherId={teacherId} date={date}/>
     
    </div>
  )
}

export default TeacherCourses
