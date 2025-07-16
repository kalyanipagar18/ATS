// 📄 Applicants.jsx - View Applicants for Posted Jobs
import React, { useEffect, useState } from 'react';
import './Applicants.css';

const Applicants = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // TODO: fetch applicants from backend
    setApplicants([
      { name: 'Aarti', email: 'aarti@mail.com', phone: '9999999999', resumeLink: '#' },
      { name: 'Ravi', email: 'ravi@mail.com', phone: '8888888888', resumeLink: '#' }
    ]);
  }, []);

  return (
    <div className="applicants-container">
      <h2>👨‍💼 Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div className="applicant-list">
          {applicants.map((a, i) => (
            <div key={i} className="applicant-card">
              <h4>{a.name}</h4>
              <p>Email: {a.email}</p>
              <p>Phone: {a.phone}</p>
              <a href={a.resumeLink} target="_blank" rel="noopener noreferrer" className="resume-btn">View Resume</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
