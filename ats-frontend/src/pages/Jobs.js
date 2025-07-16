import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Job fetch failed:', err));
  }, []);

  return (
    <div className="jobs-page">
      <h2>📌 Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map(job => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>
              <Link to={`/apply/${job._id}`} className="apply-btn">Apply</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
