import React from 'react';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports-page">
      <h1>Reports & Analytics</h1>
      <p>📊 Total Applications Received: <strong>120</strong></p>
      <p>✅ Applications Approved: <strong>45</strong></p>
      <p>❌ Applications Rejected: <strong>30</strong></p>
      <p>🕒 Applications Pending: <strong>45</strong></p>
    </div>
  );
};

export default Reports;
