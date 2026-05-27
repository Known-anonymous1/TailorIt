const express = require('express');
const router = express.Router();

router.get('/:tailorId', (req, res) => {
  res.json({ message: `List services for tailor ${req.params.tailorId}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create a new service item' });
});

module.exports = router;
