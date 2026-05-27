const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const profile = await pool.query('SELECT id FROM tailors WHERE user_id = $1', [req.user.id]);
    if (!profile.rows.length) {
      return res.status(404).json({ message: 'Tailor profile not found' });
    }

    const tailorId = profile.rows[0].id;
    const [services, portfolio, inquiries, rating] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM services WHERE tailor_id = $1', [tailorId]),
      pool.query('SELECT COUNT(*) FROM portfolios WHERE tailor_id = $1', [tailorId]),
      pool.query('SELECT COUNT(*) FROM inquiries WHERE tailor_id = $1', [tailorId]),
      pool.query('SELECT AVG(rating) FROM reviews WHERE tailor_id = $1', [tailorId]),
    ]);

    res.json({
      services: parseInt(services.rows[0].count, 10),
      portfolio: parseInt(portfolio.rows[0].count, 10),
      inquiries: parseInt(inquiries.rows[0].count, 10),
      rating: parseFloat(rating.rows[0].avg || 0).toFixed(1),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.q ? `%${req.query.q}%` : '%';
    const result = await pool.query(
      `SELECT t.id, t.business_name, t.bio, t.address, t.latitude, t.longitude, u.username AS owner
       FROM tailors t
       JOIN users u ON u.id = t.user_id
       WHERE t.business_name ILIKE $1 OR t.bio ILIKE $1 OR t.address ILIKE $1 OR u.username ILIKE $1
       ORDER BY t.created_at DESC
       LIMIT 50`,
      [searchTerm]
    );

    res.json({ tailors: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { business_name, bio, address, latitude, longitude } = req.body;
    if (!business_name) {
      return res.status(400).json({ message: 'Business name is required' });
    }

    const existing = await pool.query('SELECT id FROM tailors WHERE user_id = $1', [req.user.id]);
    if (existing.rows.length) {
      return res.status(409).json({ message: 'Tailor profile already exists for this account' });
    }

    const result = await pool.query(
      `INSERT INTO tailors (user_id, business_name, bio, address, latitude, longitude)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, business_name, bio, address, latitude, longitude`,
      [req.user.id, business_name, bio || '', address || '', latitude || null, longitude || null]
    );

    res.status(201).json({ tailor: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tailorId = req.params.id;
    const result = await pool.query(
      `SELECT t.id, t.business_name, t.bio, t.address, t.latitude, t.longitude, u.username AS owner
       FROM tailors t
       JOIN users u ON u.id = t.user_id
       WHERE t.id = $1`,
      [tailorId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: 'Tailor not found' });
    }

    const tailor = result.rows[0];
    const [services, portfolio, reviews] = await Promise.all([
      pool.query('SELECT id, title, description, price, duration FROM services WHERE tailor_id = $1 ORDER BY created_at DESC', [tailorId]),
      pool.query('SELECT id, image_url, caption FROM portfolios WHERE tailor_id = $1 ORDER BY created_at DESC', [tailorId]),
      pool.query(
        `SELECT r.id, r.rating, r.comment, r.created_at, u.username
         FROM reviews r
         LEFT JOIN users u ON u.id = r.user_id
         WHERE r.tailor_id = $1
         ORDER BY r.created_at DESC`,
        [tailorId]
      ),
    ]);

    res.json({ tailor: { ...tailor, services: services.rows, portfolio: portfolio.rows, reviews: reviews.rows } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const tailorId = req.params.id;
    const { business_name, bio, address, latitude, longitude } = req.body;
    const existingResult = await pool.query('SELECT * FROM tailors WHERE id = $1', [tailorId]);

    if (!existingResult.rows.length) {
      return res.status(404).json({ message: 'Tailor not found' });
    }
    if (existingResult.rows[0].user_id !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const existingTailor = existingResult.rows[0];
    const result = await pool.query(
      `UPDATE tailors SET business_name = $1, bio = $2, address = $3, latitude = $4, longitude = $5
       WHERE id = $6
       RETURNING id, business_name, bio, address, latitude, longitude`,
      [business_name || existingTailor.business_name, bio || existingTailor.bio, address || existingTailor.address, latitude || existingTailor.latitude, longitude || existingTailor.longitude, tailorId]
    );

    res.json({ tailor: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const tailorId = req.params.id;
    const owner = await pool.query('SELECT user_id FROM tailors WHERE id = $1', [tailorId]);

    if (!owner.rows.length) {
      return res.status(404).json({ message: 'Tailor not found' });
    }
    if (owner.rows[0].user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to remove this profile' });
    }

    await pool.query('DELETE FROM tailors WHERE id = $1', [tailorId]);
    res.json({ message: 'Tailor profile deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
