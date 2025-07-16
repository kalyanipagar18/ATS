import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ApplyForJob.css';

const ApplyForJob = () => {
  const { jobId } = useParams(); // ✅ Get jobId from URL

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    tenth: '',
    twelfth: '',
    cgpa: '',
    location: '',
    availability: '',
    expectedSalary: '',
    resumeFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resumeFile') {
      setFormData({ ...formData, resumeFile: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    form.append('jobId', jobId); // ✅ Attach jobId

    try {
      const res = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: form,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // ✅ Send token if backend is protected
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Application submitted successfully!');
      } else {
        alert(data.message || 'Failed to apply');
      }
    } catch (error) {
      console.error('Apply error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="apply-job-container">
      <h1 className="apply-heading">🚀 Apply for Job</h1>
      <p className="apply-subtext">Fill out your details to apply for the position.</p>

      <form className="apply-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="👤 Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="📧 Email Address" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="📞 Phone Number" onChange={handleChange} required />

        <input type="url" name="linkedin" placeholder="🔗 LinkedIn Profile (Optional)" onChange={handleChange} />
        <input type="url" name="github" placeholder="💻 GitHub Profile (Optional)" onChange={handleChange} />

        <input type="text" name="tenth" placeholder="🎓 10th Percentage" onChange={handleChange} required />
        <input type="text" name="twelfth" placeholder="🏫 12th Percentage" onChange={handleChange} required />
        <input type="text" name="cgpa" placeholder="📘 Current CGPA" onChange={handleChange} required />
        <input type="text" name="location" placeholder="📍 Preferred Location" onChange={handleChange} required />
        <input type="text" name="availability" placeholder="🕐 Availability (e.g. Immediate, 1 month)" onChange={handleChange} required />
        <input type="text" name="expectedSalary" placeholder="💰 Expected Salary" onChange={handleChange} required />

        <label className="upload-label">📄 Upload Resume (PDF only)</label>
        <input type="file" name="resumeFile" accept=".pdf" onChange={handleChange} required />

        <button type="submit">Apply Now</button>
      </form>
    </div>
  );
};

export default ApplyForJob;
