const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Replace with your application logic
  res.json({ message: 'Apply route working ✅' });
});

module.exports = router;
