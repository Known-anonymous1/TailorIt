const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/user/all', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.id, i.message, i.created_at, t.business_name AS tailor_name
       FROM inquiries i
       LEFT JOIN tailors t ON t.id = i.tailor_id
       WHERE i.user_id = $1
       ORDER BY i.created_at DESC`,
      [req.user.id]
    );
    res.json({ inquiries: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:tailorId', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id FROM tailors WHERE id = $1', [req.params.tailorId]);
    if (!result.rows.length || result.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view inquiries for this tailor' });
    }

    const inquiries = await pool.query(
      `SELECT i.id, i.message, i.created_at, u.username AS customer
       FROM inquiries i
       LEFT JOIN users u ON u.id = i.user_id
       WHERE i.tailor_id = $1
       ORDER BY i.created_at DESC`,
      [req.params.tailorId]
    );

    res.json({ inquiries: inquiries.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT i.id, i.message, i.created_at, t.business_name AS tailor_name
       FROM inquiries i
       LEFT JOIN tailors t ON t.id = i.tailor_id
       WHERE i.user_id = $1
       ORDER BY i.created_at DESC`,
      [req.user.id]
    );
    res.json({ inquiries: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { tailorId, message } = req.body;
    if (!tailorId || !message) {
      return res.status(400).json({ message: 'Tailor ID and message are required' });
    }

    const result = await pool.query(
      'INSERT INTO inquiries (tailor_id, user_id, message) VALUES ($1, $2, $3) RETURNING id, tailor_id, user_id, message, created_at',
      [tailorId, req.user.id, message]
    );

    res.status(201).json({ inquiry: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
