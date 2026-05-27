const express = require('express');
const router = express.Router();

router.get('/:userId', (req, res) => {
  res.json({ message: `Fetch favorites for user ${req.params.userId}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Add a new favorite tailor' });
});

module.exports = router;
