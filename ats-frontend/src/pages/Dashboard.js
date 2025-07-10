import React from 'react';
import './Dashboard.css';

const Dashboard = ({ applications }) => {
  const total = applications.length;
  const pending = applications.filter(app => !app.status).length;
  const approved = applications.filter(app => app.status === 'Approved').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;

  return (
    <div className="dashboard-page">
      <h1>ATS Dashboard</h1>

      <div className="summary-cards">
        <div className="card">Total Applications <span>{total}</span></div>
        <div className="card approved">Approved <span>{approved}</span></div>
        <div className="card rejected">Rejected <span>{rejected}</span></div>
        <div className="card pending">Pending <span>{pending}</span></div>
      </div>

      <h2>Submitted Applications</h2>
      <table className="application-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Resume Topic</th>
            <th>Resume File</th>
            <th>Skills</th>
            <th>Match</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{app.name}</td>
              <td>{app.email}</td>
              <td>{app.position}</td>
              <td>{app.resumeTopic}</td>
              <td>
                {app.resumeFile ? (
                  <a
                    href={`http://localhost:5000/uploads/${app.resumeFile}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff', textDecoration: 'underline' }}
                  >
                    View Resume
                  </a>
                ) : (
                  'No File'
                )}
              </td>
              <td>{(app.skills || []).join(', ')}</td>
              <td>
                <span
                  style={{
                    color: app.matchStatus === 'Good Match' ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {app.matchStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
