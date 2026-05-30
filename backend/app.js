const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouter = require('./src/routes/auth');
const tailorsRouter = require('./src/routes/tailors');
const servicesRouter = require('./src/routes/services');
const portfoliosRouter = require('./src/routes/portfolios');
const reviewsRouter = require('./src/routes/reviews');
const inquiriesRouter = require('./src/routes/inquiries');
const favoritesRouter = require('./src/routes/favorites');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'TailorIt API is running' });
});

app.use('/api/auth', authRouter);
app.use('/api/tailors', tailorsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/portfolios', portfoliosRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/favorites', favoritesRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
