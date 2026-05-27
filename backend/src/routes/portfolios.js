const express = require('express');
const router = express.Router();

router.get('/:tailorId', (req, res) => {
  res.json({ message: `Get portfolio images for tailor ${req.params.tailorId}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Upload a new portfolio image' });
});

module.exports = router;
