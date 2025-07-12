// src/pages/Applicants.jsx
import React, { useEffect, useState } from 'react';
import './Applicants.css';

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/applicants')
      .then(res => res.json())
      .then(data => setApplicants(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="applicants-container">
      <h2>📋 All Applicants</h2>
      {applicants.length === 0 ? (
        <p className="empty-text">No applicants found.</p>
      ) : (
        <div className="applicants-grid">
          {applicants.map(app => (
            <div key={app._id} className="applicant-card">
              <h3>{app.name}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Experience:</strong> {app.totalExperience} years</p>
              <p><strong>Status:</strong> {app.status}</p>
              <p><strong>Score:</strong> <span className="score">{app.matchScore}%</span></p>
              <p><strong>Applied for:</strong> {app.jobTitle}</p>
              <div className="skills-container">
                {app.skills?.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
              {app.resumeUrl && (
                <a href={app.resumeUrl} className="resume-link" target="_blank" rel="noreferrer">
                  📄 View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
