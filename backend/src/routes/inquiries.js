const express = require('express');
const router = express.Router();

router.get('/:tailorId', (req, res) => {
  res.json({ message: `Get inquiries for tailor ${req.params.tailorId}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create a new inquiry' });
});

module.exports = router;
