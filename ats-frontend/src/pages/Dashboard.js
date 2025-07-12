// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>📊 My Application Dashboard</h2>
      {applications.length === 0 ? (
        <p className="empty">No applications submitted yet. Start exploring jobs!</p>
      ) : (
        <div className="application-grid">
          {applications.map(app => (
            <div key={app._id} className="application-card">
              <div className="card-header">
                <h3>{app.jobTitle}</h3>
                <span className={`status-tag ${app.status.toLowerCase()}`}>{app.status}</span>
              </div>
              <p><strong>Match Score:</strong> <span className="score">{app.matchScore}%</span></p>
              <p><strong>Applied On:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
              <Link to={`/applicants/${app._id}`} className="details-button">🔎 View Full Profile</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
