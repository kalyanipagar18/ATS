const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to DB
connectDB();

// Routes
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/apply', require('./routes/apply'));
app.use('/api/applicants', require('./routes/applicants'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard')); // if needed

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
