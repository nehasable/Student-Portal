import React from 'react'
import Classes from './Classes'

const ListClass = () => {
    const student = JSON.parse(localStorage.getItem('user'));
    const studentId = student ? student._id : null;
  return (
    <div>
      <Classes studentId={studentId}/>
    </div>
  )
}

export default ListClass
