const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });


// ✅ POST /api/apply — Apply for a job
router.post('/', upload.single('resumeFile'), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      github,
      linkedin,
      tenth,
      twelfth,
      cgpa,
      location,
      availability,
      expectedSalary,
      jobId,
    } = req.body;

    // ✅ Validate job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // ✅ Create new application with recruiterId linked
    const newApp = new Application({
      applicantName: name,
      email,
      phone,
      github,
      linkedin,
      tenth,
      twelfth,
      cgpa,
      location,
      availability,
      expectedSalary,
      resumeFile: req.file?.filename || '',
      jobId: job._id,
      recruiterId: job.postedBy // 👈 Link recruiter to application
    });

    await newApp.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Application Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ GET /api/apply/my-applicants/:recruiterId — View applicants for recruiter's jobs
router.get('/my-applicants/:recruiterId', async (req, res) => {
  try {
    const recruiterId = req.params.recruiterId;

    const applicants = await Application.find({ recruiterId })
      .populate('jobId', 'title location')  // show job title in results
      .sort({ createdAt: -1 });

    res.status(200).json(applicants);
  } catch (err) {
    console.error('Fetch Error:', err.message);
    res.status(500).json({ message: 'Error fetching applicants' });
  }
});

module.exports = router;
