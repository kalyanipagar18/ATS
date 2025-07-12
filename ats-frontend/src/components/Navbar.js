import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div><strong>Smart ATS</strong></div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/login">Login</Link>
        <Link to="/applicants">Applicants</Link>

      </div>
    </nav>
  );
};

export default Navbar;
