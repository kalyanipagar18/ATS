import React, { useEffect, useState } from 'react';
import './MyPostedJobs.css';

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const recruiterId = localStorage.getItem('userId'); // recruiter’s ID stored during login

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs?postedBy=${recruiterId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setJobs(data);
        } else {
          alert(data.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Server error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [recruiterId]);

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="postedjobs-container">
      <h2>📂 My Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Location:</strong> {job.location}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
