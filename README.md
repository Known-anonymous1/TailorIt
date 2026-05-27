# TailorIt

TailorIt is a full-stack location-based marketplace connecting customers with local tailors.
This repo includes a Node.js + Express backend, a React + Vite + Tailwind frontend, and a Postman collection for API testing.

## Project Structure

- `backend/` � Express API server with PostgreSQL integration and AWS S3 upload support.
- `frontend/` � React 18 app built with Vite and Tailwind CSS.
- `TailorIt.postman_collection.json` � Postman collection for quickly testing API endpoints.

## Setup

1. Install dependencies in both `backend/` and `frontend/`:
   - `cd backend && npm install`
   - `cd frontend && npm install`

2. Configure PostgreSQL and run `backend/schema.sql` to create database tables.
3. Copy `backend/.env.example` to `backend/.env` and update your secrets.
4. (Optional) Create `frontend/.env` with `VITE_API_URL=http://localhost:5000/api` when running in development.
5. Start the backend:
   - `cd backend && npm run dev`
6. Start the frontend:
   - `cd frontend && npm run dev`

## API Endpoints

- `POST /api/auth/register` — register a customer or tailor account.
- `POST /api/auth/login` — authenticate and receive a JWT.
- `GET /api/auth/me` — fetch the current authenticated user.
- `GET /api/auth/summary` — fetch customer activity metrics.
- `GET /api/tailors` — list tailors with optional query `q`.
- `GET /api/tailors/:id` — fetch a tailor profile with services, portfolio, and reviews.
- `GET /api/tailors/summary` — fetch tailor dashboard metrics for the authenticated tailor.
- `GET /api/services/:tailorId` — fetch services for a tailor.
- `GET /api/portfolios/:tailorId` — fetch portfolio items for a tailor.
- `GET /api/reviews/:tailorId` — fetch reviews for a tailor.
- `GET /api/inquiries/user/all` — fetch inquiries submitted by the authenticated customer.
- `GET /api/inquiries/:tailorId` — fetch inquiries for the authenticated tailor owner.
- `POST /api/inquiries` — send a new inquiry to a tailor.
- `GET /api/favorites/:userId` — fetch favorites for the authenticated user.
- `POST /api/favorites` — save a tailor to favorites.

## Notes

- The project name has been updated to `TailorIt`.
- The `backend/.env` database URL uses `tailorit` by default.
- Do not commit `backend/.env` to source control.
- Frontend GitHub Pages deployment is configured to publish from `frontend/dist` to the `gh-pages` branch.
