import React, { useState } from 'react';
import './AddJob.css';

const AddJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    location: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Job added successfully!');
      setJobData({ title: '', location: '', description: '' });
    } else {
      setMessage(data.message || '❌ Failed to add job');
    }
  };

  return (
    <div className="add-job-page">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit} className="add-job-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Post Job</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddJob;
