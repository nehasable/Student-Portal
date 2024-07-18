import React from 'react'
import Teacher from './Teacher'

const TeacherCourses = () => {
    const teacher = JSON.parse(localStorage.getItem('user'));
  const teacherId = teacher ? teacher._id : null;
  return (
    <div>
      <Teacher teacherId={teacherId}/>
    </div>
  )
}

export default TeacherCourses
