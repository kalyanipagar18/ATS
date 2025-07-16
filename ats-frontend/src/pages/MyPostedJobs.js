// 📄 MyPostedJobs.jsx - Recruiter View of Jobs
import React, { useEffect, useState } from 'react';
import './MyPostedJobs.css';

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // TODO: fetch posted jobs from backend
    setJobs([
      { title: 'Frontend Developer', location: 'Pune', description: 'React, HTML, CSS' },
      { title: 'Backend Developer', location: 'Bangalore', description: 'Node.js, MongoDB' }
    ]);
  }, []);

  return (
    <div className="postedjobs-container">
      <h2>📂 My Posted Jobs</h2>
      <div className="job-list">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPostedJobs;
