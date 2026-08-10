# FloraVision 🌿 - Live-Ready Full-Stack Plant Selling E-Commerce Platform

A modern, high-converting e-commerce web application built for selling indoor, outdoor, desktop, and air-purifying plants online.

---

## 📁 Repository Architecture

The project is cleanly divided into two dedicated sub-applications:

```
Intership Project/
├── frontend/                  # React 19 + Vite Frontend Application
│   ├── public/                # Favicon, icons, and plant image assets
│   ├── src/                   # Organized React components & styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json           # React, Vite & UI Dependencies
│
├── backend/                   # Express + MongoDB REST API Server
│   ├── config/                # Mongoose database connection (db.js)
│   ├── controllers/           # Auth, Plant, Order & Admin controllers
│   ├── models/                # User, Plant, Order & Review Schemas
│   ├── routes/                # Express API Route modules
│   ├── scripts/               # Database seeder (seed.js)
│   ├── index.js               # Express entry point
│   ├── .env.example           # Environment configuration template
│   └── package.json           # Express, Mongoose & CORS Dependencies
│
├── docs/                      # Screenshots & project documentation
└── README.md
```

---

## 🚀 Quick Setup & Run Commands

### 1. Install Dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Backend Environment & Database Setup
In `backend/`, create a `.env` file (copied from `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/floravision?retryWrites=true&w=majority
```

To seed initial plant catalog, admin user (`admin@floravision.com` / `admin123`), and customer reviews:
```bash
cd backend
npm run seed
```

### 3. Run Application

- **Option A: Run from subfolders**
  - Terminal 1 (Backend): `cd backend && npm start` (runs on http://localhost:5000)
  - Terminal 2 (Frontend): `cd frontend && npm run dev` (runs on http://localhost:5173)

- **Option B: Run from root directory**
  - Terminal 1: `npm run dev:backend`
  - Terminal 2: `npm run dev:frontend`

---

## 🔐 Store Admin Credentials

- **Admin Email**: `admin@floravision.com`
- **Admin Password**: `admin123`
- Click **"Admin Panel"** in the top navigation bar to open store management.

---

## 🌐 Deployment Instructions

### Frontend (Vercel / Netlify / Render)
1. Set Root Directory: `frontend`
2. Build Command: `npm run build`
3. Output Directory: `dist`

### Backend (Render / Railway / Heroku)
1. Set Root Directory: `backend`
2. Start Command: `npm start` or `node index.js`
3. Environment Variables: Set `MONGODB_URI`
