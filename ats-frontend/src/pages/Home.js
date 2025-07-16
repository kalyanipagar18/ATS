import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>
          {role === 'recruiter' && 'Welcome Recruiter 👔'}
          {role === 'applicant' && 'Welcome Applicant 🙋‍♀️'}
          {!role && 'Welcome to Smart ATS 🚀'}
        </h1>
        <p>Bridging Talent & Opportunity — For Smart Hiring and Seamless Applying.</p>

        {!role && (
          <div className="cta-buttons">
            <a href="/register" className="hero-button">Register as Applicant</a>
            <a href="/register" className="hero-button">Register as Recruiter</a>
          </div>
        )}

        {role === 'recruiter' && (
          <a href="/dashboard" className="hero-button">Go to Dashboard</a>
        )}
        {role === 'applicant' && (
  <Link to="/apply" className="hero-button">Apply for Jobs</Link>
)}


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

      {/* Why ATS Section (Optional Add-On) */}
      <section className="features">
        <h2>Why Smart ATS?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>All candidate data is encrypted and securely stored.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast Hiring Process</h3>
            <p>Save 70% of your hiring time with smart automation.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 GenAI Assistance</h3>
            <p>Leverage AI to rank, shortlist, and suggest top candidates.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to hire smarter?</h2>
        <p>Get started by posting a job or reviewing applications now.</p>
        <a href="/dashboard" className="cta-button">Go to Dashboard</a>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Smart ATS. Built with logic, not AI.</p>
      </footer>
    </div>
  );
};

export default Home;
