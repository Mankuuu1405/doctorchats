# Hospital Consultation App

A full-stack doctor consultation platform with chat-based consultations.

## Apps
- `backend/` – Node/Express API, MongoDB, Cloudinary, Nodemailer
- `frontend/` – Vite + React (patient site)
- `admin/` – Vite + React (admin/doctor panels)

## Environment Variables
Create `.env` files per app using the examples below.

### backend/.env
See `backend/.env.example`.

### frontend/.env
See `frontend/.env.example`.

### admin/.env
See `admin/.env.example`.

## Dev
- backend: `cd backend && npm i && npm run dev`
- frontend: `cd frontend && npm i && npm run dev`
- admin: `cd admin && npm i && npm run dev`

## Build
- frontend: `npm run build` → `dist/`
- admin: `npm run build` → `dist/`

## Deploy
- Deploy backend to your server/platform with `backend/.env` set.
- Deploy `frontend/` and `admin/` to a static host (e.g., Vercel). Set `VITE_BACKEND_URL` to your backend URL in each project.

## License
Proprietary – client project.


