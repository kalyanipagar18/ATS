import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/jobs')
      .then((res) => res.json())
      .then((data) => {
        console.log('Jobs API Response:', data);

        // Handle both direct array or object with "jobs" key
        if (Array.isArray(data)) {
          setJobs(data);
        } else if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          console.error('❌ Unexpected jobs format:', data);
          setJobs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to load jobs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div key={job._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
              <Link
                to={`/job/${job._id}`}
                className="text-indigo-600 mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
