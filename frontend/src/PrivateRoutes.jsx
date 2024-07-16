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

import React from "react";
import { Routes, Route, Navigate,Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("user"))?.role;

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (role === "student") {
    return (
      <Routes>
       
        <Route path="/student" element={<Outlet />} />
        <Route path="/teacher" element={<Navigate to="/student" />} /> {/* redirect teacher to student */}
        <Route path="/signin" element={<Navigate to="/student" />} /> {/* redirect signin to student */}
      </Routes>
    );
  } else if (role === "teacher") {
    return (
      <Routes>
        
        <Route path="/student" element={<Navigate to="/teacher" />} /> {/* redirect student to teacher */}
        <Route path="/teacher" element={<Outlet />} />
        <Route path="/signin" element={<Navigate to="/teacher" />} /> {/* redirect signin to teacher */}
      </Routes>
    );
  }

  return <Navigate to="/signin" />; // redirection if token or role is invalid
};

export default PrivateRoutes;
