// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    linkedin: '',
    github: '',
    resumeLink: '',
    portfolio: '',
    role: 'applicant',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('User Data:', formData); // Replace with API call
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Create Your Smart ATS Account</h2>
        <p className="subtext">Join as an applicant or recruiter to start your journey</p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div className="form-group">
            <input type="url" name="linkedin" placeholder="LinkedIn Profile URL" onChange={handleChange} />
            <input type="url" name="github" placeholder="GitHub Profile URL" onChange={handleChange} />
          </div>

          <div className="form-group">
            <input type="url" name="portfolio" placeholder="Portfolio Website (Optional)" onChange={handleChange} />
            <input type="url" name="resumeLink" placeholder="Resume Drive Link (Optional)" onChange={handleChange} />
          </div>

          <div className="form-group">
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
          </div>

          <button type="submit">Register Account</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
