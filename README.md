

# AI Resume Builder 🚀

An AI-powered Resume Builder and Cover Letter Generator built using React, Node.js, Express and Gemini API.

## ✨ Features
- AI Resume Optimization
- AI Cover Letter Generation
- Gemini API Integration
- Responsive UI
- Full Stack Deployment

## 🛠 Tech Stack
- React
- Node.js
- Express.js
- Gemini API
- Render
- Vercel

## 🌐 Live Demo
https://your-vercel-link.vercel.app

## 📂 GitHub Repository
https://github.com/yourusername/AI_RESUME_BUILDER

## 👩‍💻 Author
Sharmila
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment

This project is split into a React frontend and an Express backend.

### Backend deployment

1. Copy `backend/.env.example` to `backend/.env`.
2. Set `GEMINI_API_KEY` to your Google API key.
3. Deploy the `backend` folder to a Node host such as Railway, Render, or Fly.io.
4. Make sure the app runs with `npm start` and exposes port `8080` or the configured port.

### Frontend deployment

1. Set `VITE_API_URL` in your frontend host to the backend base URL, e.g. `https://your-backend.example.com`.
   - If you use a URL that already includes `/generate`, the app will still work.
2. Build the frontend with:
   ```bash
   npm run build
   ```
3. Deploy the resulting static output to Vercel, Netlify, or any static hosting service.

### Local setup

- Start the backend in `backend`:
  ```bash
  cd backend
  npm install
  node server.js
  ```
- Start the frontend in the root:
  ```bash
  npm install
  npm run dev
  ```

### Notes

- The frontend uses `import.meta.env.VITE_API_URL` in production.
- The backend uses `process.env.GEMINI_API_KEY`.

### Render deployment

This repository includes a `render.yaml` file for deploying both backend and frontend on Render.

1. Push your repo to GitHub.
2. In Render, create a new Web Service using the repo and choose the `render.yaml` option.
3. Render will create two services:
   - `resume-builder-backend` (Node web service from `backend`)
   - `resume-builder-frontend` (static site from the root with `dist` publish directory)
4. Set environment variables on Render:
   - `GEMINI_API_KEY` for `resume-builder-backend`
   - `VITE_API_URL` for `resume-builder-frontend`, e.g. `https://your-backend.onrender.com`
     - A URL that already contains `/generate` is also accept
