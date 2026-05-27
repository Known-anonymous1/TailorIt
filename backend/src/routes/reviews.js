const express = require('express');
const router = express.Router();

router.get('/:tailorId', (req, res) => {
  res.json({ message: `Fetch reviews for tailor ${req.params.tailorId}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Submit a new review' });
});

module.exports = router;
