// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';

// const PrivateRoutes = () => {
//   const token = localStorage.getItem('token');
//   const role = JSON.parse(localStorage.getItem('user'))?.role;

//   if (!token) {
//     return <Navigate to="/signin" />;
//   }

//   if (role === 'student') {
//     return <Outlet />;
//   } else if (role === 'teacher') {
//     return <Outlet />;
//   }

//   return <Navigate to="/signin" />;
// };

// export default PrivateRoutes;

// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';

// const PrivateRoutes = () => {
//   const token = localStorage.getItem('token');
//   const role = JSON.parse(localStorage.getItem('user'))?.role;

//   if (!token) {
//     return <Navigate to="/signin" />;
//   }

//   if (role === 'student') {
//     return <Outlet />;
//   } else if (role === 'teacher') {
//     return <Outlet />;
//   }else{
//     <Outlet/>
//   }

//   return <Outlet />;
// };

// export default PrivateRoutes;

//123

// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";

// const PrivateRoutes = () => {
//   const token = localStorage.getItem("token");
//   const role = JSON.parse(localStorage.getItem("user"))?.role;

//   if (!token) {
//     return <Navigate to="/signin" />;
//   }

//   if (role === "student") {
//     if(token){ return <Navigate to="/student"/> }
//     return <Navigate to="/student" />;
//   } else if (role === "teacher") {
//     return <Outlet />;
//   }
//   // if (role === "student") {
//   //   return <Outlet />;
//   // } else if (role === "teacher") {
//   //   return <Navigate to='/teacher'/>;
//   // }

//   return <Outlet />;
// };

// export default PrivateRoutes;

// import React from 'react';
// import { Outlet, Navigate } from 'react-router-dom';

// const PrivateRoutes = () => {
//   const token = localStorage.getItem('token');
//   const role = JSON.parse(localStorage.getItem('user'))?.role;

// if (!token) {
//   return <Navigate to="/signin" />;
// }

// role==='student'?<Outlet/>:<Navigate to="/student" />
// // role==='teacher'?<Navigate to='/teacher'/>:<Outlet/>

// return <Navigate to="/signin" />;
// }
// export default PrivateRoutes;


///final

import React, { useEffect } from "react";
import { Routes, Route,  Navigate,Outlet, useNavigate } from "react-router-dom";
import Student from './pages/student/Student';
import Teacher from './pages/teacher/Teacher';
import { useLocation } from 'react-router-dom'
import CourseForm from './pages/student/CourseForm/CourseForm';
import Classes from './pages/student/Classes/Classes';
import ListClass from "./pages/student/Classes/ListClass";
import TeacherCourses from "./pages/teacher/TeacherCourses";

const PrivateRoutes = () => { 
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {    
    if (!token) {
      navigate("/signin");
    }
  }, []);

  return (
    <>
    {
      role === "student" ?
      <Routes>
        <Route path="/student" element={<Student />} />
        {/* <Route path="/book" element={<CourseForm />} /> */}
        <Route path="/classes" element={<ListClass />} />
        <Route path="*" element={<Navigate to='/student' replace />} />
      </Routes>
      :
      role === "teacher" ?
      <Routes>
        <Route path="/teacher" element={<TeacherCourses />} /> 
        <Route path="*" element={<Navigate to='/teacher' replace />} />
      </Routes>
      :
      <Navigate to="/signin" />
    }
    </>
  )
};

export default PrivateRoutes;
