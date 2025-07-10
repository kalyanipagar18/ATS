import React, { useState, useEffect } from 'react';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: '',
    description: ''
  });

  // Load existing jobs from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: formData.title,
        department: formData.department,
        type: formData.type,
        description: formData.description
      })
    });
    const newJob = await response.json();
    setJobs(prev => [...prev, newJob.job]);
    setFormData({ title: '', department: '', type: '', description: '' });
    alert("Job added successfully!");
  };

  return (
    <div className="jobs-page">
      <h1>Job Listings</h1>

      {/* Job Form */}
      <form className="job-form" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" required value={formData.title} onChange={handleChange} />
        <input type="text" name="department" placeholder="Department" required value={formData.department} onChange={handleChange} />
        <select name="type" required value={formData.type} onChange={handleChange}>
          <option value="">Select Type</option>
          <option>Full-Time</option>
          <option>Part-Time</option>
          <option>Internship</option>
        </select>
        <textarea name="description" placeholder="Job Description or Required Skills" required value={formData.description} onChange={handleChange}></textarea>
        <button type="submit">Add Job</button>
      </form>

      {/* Job Cards */}
      <div className="job-cards">
        {jobs.map((job, index) => (
          <div className="job-card" key={index}>
            <h3>{job.position}</h3>
            <p><strong>Department:</strong> {job.department}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Required:</strong> {job.requiredSkills?.join(', ')}</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
