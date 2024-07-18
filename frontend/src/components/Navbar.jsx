import React from 'react'
import './Navbar.css'
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/signin');
      };
  return (
    <div>
        <div className="navbar">
            <div className="home"> <Link className="link"to="/home">Home</Link></div>
       
        <Link className="link"to="/student">Book a Course</Link>
       <Link className="link"to="/classes">Classes</Link>
       <button className="logout-button" onClick={handleLogout}>
       Logout
     </button>
     </div>
    </div>
  )
}

export default Navbar
