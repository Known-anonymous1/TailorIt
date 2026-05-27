# TailorIt

TailorIt is a full-stack location-based marketplace connecting customers with local tailors.
This repo includes a Node.js + Express backend, a React + Vite + Tailwind frontend, and a Postman collection for API testing.

## Project Structure

- `backend/` — Express API server with PostgreSQL integration and AWS S3 upload support.
- `frontend/` — React 18 app built with Vite and Tailwind CSS.
- `TailorIt.postman_collection.json` — Postman collection for quickly testing API endpoints.

## Setup

1. Install dependencies in both `backend/` and `frontend/`:
   - `cd backend && npm install`
   - `cd frontend && npm install`

2. Configure PostgreSQL and run `backend/schema.sql` to create database tables.
3. Copy `backend/.env.example` to `backend/.env` and update your secrets.
4. Start the backend:
   - `cd backend && npm run dev`
5. Start the frontend:
   - `cd frontend && npm run dev`

## Notes

- The project name has been updated to `TailorIt`.
- The `backend/.env` database URL uses `tailorit` by default.
- Do not commit `backend/.env` to source control.
