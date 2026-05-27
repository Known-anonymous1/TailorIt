const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/:tailorId', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.id, r.rating, r.comment, r.created_at, u.username
       FROM reviews r
       LEFT JOIN users u ON u.id = r.user_id
       WHERE r.tailor_id = $1
       ORDER BY r.created_at DESC`,
      [req.params.tailorId]
    );
    res.json({ reviews: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { tailorId, rating, comment } = req.body;
    if (!tailorId || !rating) {
      return res.status(400).json({ message: 'Tailor ID and rating are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      'INSERT INTO reviews (tailor_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING id, tailor_id, user_id, rating, comment, created_at',
      [tailorId, req.user.id, rating, comment || '']
    );

    res.status(201).json({ review: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
