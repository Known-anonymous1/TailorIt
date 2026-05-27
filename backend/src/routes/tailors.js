const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get tailor search results / list' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create new tailor profile' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get tailor profile ${req.params.id}` });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update tailor ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete tailor ${req.params.id}` });
});

module.exports = router;
