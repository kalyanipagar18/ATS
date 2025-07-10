const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mongoose = require('mongoose');

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/atsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Mongoose Schemas
const jobSchema = new mongoose.Schema({
  position: String,
  department: String,
  type: String,
  requiredSkills: [String]
});

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  position: String,
  resumeTopic: String,
  resumeFile: String,
  skills: [String],
  matchStatus: String
});

const Job = mongoose.model('Job', jobSchema);
const Application = mongoose.model('Application', applicationSchema);

// Multer file upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Extended skill keyword list
const knownSkills = [
  'javascript', 'js', 'react', 'reactjs', 'html', 'css', 'tailwind', 'bootstrap',
  'node', 'nodejs', 'express', 'expressjs', 'python', 'java', 'mongodb', 'mongo', 'sql', 'mysql'
];

// ✅ Extract known skills from resume text
function extractSkillsFromText(text) {
  const lowerText = text.toLowerCase();
  return knownSkills.filter(skill => lowerText.includes(skill));
}

// ✅ POST /api/jobs - Save new job
app.post('/api/jobs', async (req, res) => {
  const { position, department, type, description } = req.body;
  const words = description.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const uniqueSkills = [...new Set(words.filter(w => knownSkills.includes(w)))];

  const newJob = new Job({
    position,
    department,
    type,
    requiredSkills: uniqueSkills
  });

  await newJob.save();
  res.status(201).json({ message: 'Job saved', job: newJob });
});

// ✅ GET /api/jobs - Get all jobs
app.get('/api/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// ✅ POST /api/applications - Resume + Match
app.post('/api/applications', upload.single('resumeFile'), async (req, res) => {
  const { name, email, position, resumeTopic } = req.body;
  const resumeFile = req.file ? req.file.filename : null;
  const filepath = req.file ? req.file.path : null;

  let extractedSkills = [];
  let matchStatus = 'Unknown';
  let jobSkills = [];
  let matched = [];
  let matchRatio = 0;

  if (filepath && filepath.endsWith('.pdf')) {
    try {
      const dataBuffer = fs.readFileSync(filepath);
      const pdfData = await pdfParse(dataBuffer);
      extractedSkills = extractSkillsFromText(pdfData.text);

      const job = await Job.findOne({ position });
      jobSkills = job?.requiredSkills || [];

      matched = extractedSkills.map(s => s.toLowerCase().trim())
        .filter(skill => jobSkills.map(j => j.toLowerCase().trim()).includes(skill));

      matchRatio = jobSkills.length ? matched.length / jobSkills.length : 0;
      matchStatus = matchRatio >= 0.5 ? 'Good Match' : 'Not Suitable';

      // Debug logs in terminal
      console.log("📄 Extracted Skills:", extractedSkills);
      console.log("💼 Job Skills:", jobSkills);
      console.log("✅ Matched Skills:", matched);
      console.log("📊 Match %:", Math.round(matchRatio * 100) + '%');
    } catch (err) {
      console.error('❌ Error parsing PDF:', err);
    }
  }

  const newApp = new Application({
    name,
    email,
    position,
    resumeTopic,
    resumeFile,
    skills: extractedSkills,
    matchStatus,
  });

  await newApp.save();

  // Respond with debug data
  res.status(201).json({
    message: 'Application submitted',
    application: newApp,
    debug: {
      extractedSkills,
      jobSkills,
      matched,
      matchRatio: `${(matchRatio * 100).toFixed(2)}%`
    }
  });
});

// ✅ GET /api/applications - Get all applications
app.get('/api/applications', async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
