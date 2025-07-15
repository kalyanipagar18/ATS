const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Applicants route working ✅' });
});

module.exports = router;
