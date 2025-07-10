import React, { useState, useEffect } from 'react';
import './Applications.css';

const Applications = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    resumeTopic: '',
    resumeFile: null
  });

  const [jobOptions, setJobOptions] = useState([]);

  // Fetch job positions from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        setJobOptions(data);
      } catch (err) {
        console.error('Error fetching job options:', err);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resumeFile') {
      setFormData({ ...formData, resumeFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('position', formData.position);
    form.append('resumeTopic', formData.resumeTopic);
    form.append('resumeFile', formData.resumeFile);

    try {
      const res = await fetch('http://localhost:5000/api/applications', {
        method: 'POST',
        body: form,
      });

      const data = await res.json();
      if (onSubmit) onSubmit(data.application);

      // Clear form
      setFormData({
        name: '',
        email: '',
        position: '',
        resumeTopic: '',
        resumeFile: null
      });
    } catch (error) {
      console.error('❌ Error submitting application:', error);
    }
  };

  return (
    <div className="applications-page">
      <h1>Submit Application</h1>
      <form className="application-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <select
          name="position"
          value={formData.position}
          required
          onChange={handleChange}
        >
          <option value="">Select Position</option>
          {jobOptions.map((job, idx) => (
            <option key={idx} value={job.position}>
              {job.position}
            </option>
          ))}
        </select>
        <textarea
          name="resumeTopic"
          placeholder="Resume Summary / Project Topic"
          value={formData.resumeTopic}
          required
          onChange={handleChange}
        ></textarea>
        <input
          type="file"
          name="resumeFile"
          accept=".pdf,.doc,.docx"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Applications;
