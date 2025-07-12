// src/pages/Apply.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Apply = () => {
  const { jobId } = useParams();
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please upload your resume!');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobId', jobId);

    try {
      setStatus('Uploading...');
      const res = await fetch('http://localhost:5000/api/apply', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setParsedData(data);
      setStatus('Uploaded successfully!');
    } catch (err) {
      setStatus('Error uploading');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-tr from-indigo-100 to-purple-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Apply for Job</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-lg mx-auto space-y-4">
        <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full" />
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Upload Resume</button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">{status}</p>

      {parsedData && (
        <div className="bg-white p-6 mt-6 max-w-lg mx-auto rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-indigo-700">Parsed Resume Info</h3>
          <p><strong>Name:</strong> {parsedData.name}</p>
          <p><strong>Email:</strong> {parsedData.email}</p>
          <p><strong>Skills:</strong> {parsedData.skills?.join(', ')}</p>
          <p><strong>Total Experience:</strong> {parsedData.totalExperience} years</p>
        </div>
      )}
    </div>
  );
};

export default Apply;
