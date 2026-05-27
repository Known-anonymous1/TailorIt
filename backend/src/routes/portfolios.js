const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/:tailorId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, image_url, caption FROM portfolios WHERE tailor_id = $1 ORDER BY created_at DESC',
      [req.params.tailorId]
    );
    res.json({ portfolio: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { tailorId, imageUrl, caption } = req.body;
    if (!tailorId || !imageUrl) {
      return res.status(400).json({ message: 'Tailor ID and image URL are required' });
    }

    const owner = await pool.query('SELECT user_id FROM tailors WHERE id = $1', [tailorId]);
    if (!owner.rows.length || owner.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add portfolio content for this tailor' });
    }

    const result = await pool.query(
      'INSERT INTO portfolios (tailor_id, image_url, caption) VALUES ($1, $2, $3) RETURNING id, image_url, caption',
      [tailorId, imageUrl, caption || '']
    );

    res.status(201).json({ portfolio: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
