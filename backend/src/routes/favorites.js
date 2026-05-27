const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/:userId', authenticateToken, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this favorites list' });
    }

    const result = await pool.query(
      `SELECT f.id, f.created_at, t.id AS tailor_id, t.business_name, t.address
       FROM favorites f
       JOIN tailors t ON t.id = f.tailor_id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );

    res.json({ favorites: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { tailorId } = req.body;
    if (!tailorId) {
      return res.status(400).json({ message: 'Tailor ID is required' });
    }

    const existing = await pool.query('SELECT id FROM favorites WHERE user_id = $1 AND tailor_id = $2', [req.user.id, tailorId]);
    if (existing.rows.length) {
      return res.status(200).json({ message: 'Already added to favorites' });
    }

    const result = await pool.query(
      'INSERT INTO favorites (user_id, tailor_id) VALUES ($1, $2) RETURNING id, tailor_id, created_at',
      [req.user.id, tailorId]
    );
    res.status(201).json({ favorite: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Already added to favorites' });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
