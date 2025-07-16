// 📄 ApplicantDashboard.jsx
import React from 'react';
import './ApplicantDashboard.css';

const ApplicantDashboard = () => {
  // Example static data (you can later fetch this via API)
  const applications = [
    {
      jobTitle: 'Frontend Developer',
      company: 'TechSpark Pvt Ltd',
      status: 'Under Review',
      appliedOn: '2025-07-12'
    },
    {
      jobTitle: 'UI/UX Designer',
      company: 'DesignHub Studios',
      status: 'Shortlisted',
      appliedOn: '2025-07-10'
    }
  ];

  return (
    <div className="applicant-dashboard">
      <h1>🎯 Applicant Dashboard</h1>
      <p className="dashboard-subtext">Track your job applications and see the latest updates here.</p>

      {applications.length === 0 ? (
        <p>No applications yet. Start applying now!</p>
      ) : (
        <div className="application-list">
          {applications.map((app, index) => (
            <div className="application-card" key={index}>
              <h3>{app.jobTitle}</h3>
              <p><strong>Company:</strong> {app.company}</p>
              <p><strong>Status:</strong> <span className={`status ${app.status.toLowerCase().replace(/\s/g, '-')}`}>{app.status}</span></p>
              <p><strong>Applied On:</strong> {app.appliedOn}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;

