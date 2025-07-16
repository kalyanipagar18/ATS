const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect } = require('../middleware/authMiddleware'); // ✅ Protect route

// ✅ GET all jobs or only jobs by specific recruiter
router.get('/', async (req, res) => {
  try {
    const { postedBy } = req.query; // ✅ Support recruiter filter
    const filter = postedBy ? { postedBy } : {};
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST new job (Recruiter only)
router.post('/', protect, async (req, res) => {
  const { title, location, description, skills, salary } = req.body;

  try {
    const newJob = new Job({
      title,
      location,
      description,
      skills,
      salary,
      postedBy: req.user.id, // 👈 Link recruiter
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
