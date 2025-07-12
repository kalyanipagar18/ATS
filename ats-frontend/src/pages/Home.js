// src/pages/Home.jsx
import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Smart ATS 🚀</h1>
        <p>Your intelligent hiring assistant — built to simplify recruitment.</p>
        <a href="/jobs" className="hero-button">Explore Jobs</a>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Platform Highlights</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📄 Resume Parsing</h3>
            <p>Smartly extract candidate details using rule-based parsing logic.</p>
          </div>
          <div className="feature-card">
            <h3>🔍 Skill Matching</h3>
            <p>Automatically match candidates based on job skill requirements.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Resume Scoring</h3>
            <p>Calculate score based on matched skills, experience, and job requirements.</p>
          </div>
          <div className="feature-card">
            <h3>⚙️ Custom Filters</h3>
            <p>Filter candidates by experience, education, and keywords.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to hire smarter?</h2>
        <p>Get started by posting a job or reviewing applications now.</p>
        <a href="/dashboard" className="cta-button">View Dashboard</a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Smart ATS. Built with logic, not AI.</p>
      </footer>
    </div>
  );
};

export default Home;
