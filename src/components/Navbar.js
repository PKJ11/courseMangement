// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title permanent-marker">
        Coursify
      </div>
      <div className="navbar-links">
        <Link to="/">Courses</Link>
        <Link to="/students">Students</Link>
      </div>
    </nav>
  );
};

export default Navbar;
