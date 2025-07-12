// src/pages/JobDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => setJob(data))
      .catch(err => console.error('Failed to load job details', err));
  }, [jobId]);

  if (!job) return <div className="text-center p-10">Loading job...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white mt-10 rounded shadow">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">{job.title}</h1>
      <p className="text-gray-700 mb-2"><strong>Description:</strong> {job.description}</p>
      <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.location}</p>
      <p className="text-gray-700 mb-4"><strong>Requirements:</strong> {job.requirements}</p>
      <Link to={`/apply/${job._id}`} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Apply Now</Link>
    </div>
  );
};

export default JobDetails;
