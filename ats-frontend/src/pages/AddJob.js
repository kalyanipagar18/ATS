// 📄 AddJob.jsx - Post Job Form (Recruiter)
import React, { useState } from 'react';
import './AddJob.css';

const AddJob = () => {
  const [job, setJob] = useState({ title: '', location: '', description: '', skills: '', salary: '' });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Posting job:', job);
    // TODO: Connect to backend API
  };

  return (
    <div className="addjob-container">
      <h2 className="addjob-title">📝 Post a New Job</h2>
      <p className="addjob-subtext">Fill out the form below to post a new job opening and attract top talent.</p>
      <form className="addjob-form" onSubmit={handleSubmit}>
        <h4 className="form-section">Job Information</h4>
        <input type="text" name="title" placeholder="📌 Job Title" value={job.title} onChange={handleChange} required />
        <input type="text" name="location" placeholder="📍 Location" value={job.location} onChange={handleChange} required />

        <h4 className="form-section">Requirements</h4>
        <textarea name="description" placeholder="📝 Job Description" value={job.description} onChange={handleChange} rows="4" required />
        <input type="text" name="skills" placeholder="💡 Required Skills (comma-separated)" value={job.skills} onChange={handleChange} />
        <input type="text" name="salary" placeholder="💰 Salary Range (e.g. 5-7 LPA)" value={job.salary} onChange={handleChange} />

        <button type="submit">📤 Post Job</button>
      </form>
    </div>
  );
};

export default AddJob;