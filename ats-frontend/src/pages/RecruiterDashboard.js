// src/pages/Dashboard.jsx
import React from 'react';
import './RecruiterDashboard.css';

const Dashboard = () => {
  // These values can be fetched via useEffect + API
  const jobCount = 5;
  const applicantCount = 26;

  return (
    <div className="dashboard-container">
      <h1>📊 Recruiter Dashboard</h1>
      <p className="dashboard-subtext">Track all your recruitment activity here.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h2>{jobCount}</h2>
          <p>Jobs Posted</p>
        </div>
        <div className="card">
          <h2>{applicantCount}</h2>
          <p>Total Applicants</p>
        </div>
      </div>

      <div className="dashboard-tip">
        💡 Tip: Stay proactive — regularly update job descriptions and follow up with top applicants.
      </div>
    </div>
  );
};

export default Dashboard;
