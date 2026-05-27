const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/:tailorId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, price, duration FROM services WHERE tailor_id = $1 ORDER BY created_at DESC',
      [req.params.tailorId]
    );
    res.json({ services: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { tailorId, title, description, price, duration } = req.body;
    if (!tailorId || !title) {
      return res.status(400).json({ message: 'Tailor ID and title are required' });
    }

    const owner = await pool.query('SELECT user_id FROM tailors WHERE id = $1', [tailorId]);
    if (!owner.rows.length || owner.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add services for this tailor' });
    }

    const result = await pool.query(
      'INSERT INTO services (tailor_id, title, description, price, duration) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, description, price, duration',
      [tailorId, title, description || '', price || 0, duration || 'Flexible']
    );

    res.status(201).json({ service: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
