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

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Student from './pages/student/Student';
import Teacher from './pages/teacher/Teacher';
import CourseForm from './pages/student/CourseForm/CourseForm';
import ListClass from "./pages/student/Classes/ListClass";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TotalCourses from "./pages/teacher/TotalCourses";
import Courses from "./pages/teacher/Courses";

const PrivateRoutes = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate async data fetching
    const fetchRole = async () => {
      try {
        const user = localStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;
        if (parsedUser && parsedUser.role) {
          setRole(parsedUser.role);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token, navigate]);

  if (loading) {
    return <div>Loading...</div>; // or some loading spinner
  }

  return (
    <>
      {role === "student" ? (
        <Routes>
          <Route path="/student" element={<Student />} />
          <Route path="/book" element={<CourseForm />} />
          <Route path="/classes" element={<ListClass />} />
          <Route path="*" element={<Navigate to='/student' replace />} />
        </Routes>
      ) : role === "teacher" ? (
        <Routes>
          <Route path="/teacher" element={<TeacherCourses />} />
          <Route path="*" element={<Navigate to='/teacher' replace />} />
          <Route path="/teacher/classes" element={<Courses />} />
        </Routes>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
};

export default PrivateRoutes;
