# AI Resume Builder 🚀

An AI-powered Resume Builder and Cover Letter Generator built using React, Vite, Node.js, Express.js, and Gemini API.

This project helps users create professional resumes and generate AI-based cover letters instantly using Gemini AI.

# 📌 Table of Contents

- Introduction
- Features
- Tech Stack
- Project Structure
- Installation
- Setup
- Environment Variables
- API Integration
- Usage
- Deployment
- Troubleshooting
- Future Enhancements
- Author
- License

---

# 📖 Introduction

AI Resume Builder is a full-stack web application that allows users to:

- Build professional resumes
- Generate AI-powered cover letters
- Optimize resume content using Gemini AI
- Access the application on desktop and mobile devices

The application uses:
- React + Vite for frontend
- Node.js + Express for backend
- Gemini API for AI-generated responses

---

# ✨ Features

## ✅ AI Resume Optimization
- Improve resume summaries
- Generate professional descriptions
- Enhance resume quality using AI

## ✅ AI Cover Letter Generator
- Generate professional cover letters
- Personalized AI-generated content

## ✅ Responsive UI
- Mobile-friendly interface
- Clean modern design

## ✅ Full Stack Application
- React frontend
- Express backend
- API integration

## ✅ Deployment Ready
- Frontend deployable on Vercel
- Backend deployable on Render

---

# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- CSS3
- JavaScript

## Backend
- Node.js
- Express.js

## AI Integration
- Gemini API

## Deployment
- Vercel
- Render

## Version Control
- Git
- GitHub

---

# 🏗 Project Structure

```bash
AI_RESUME_BUILDER/
│
├── public/
│
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server.js
├── package.json
├── vite.config.js
├── .env
├── README.md
└── .gitignore
```

---

# ⚙️ Prerequisites

Install the following software before running the project:

- Node.js
- npm
- Git
- VS Code (Recommended)

---

# 📥 Installation

## Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/AI_RESUME_BUILDER.git
```

## Step 2: Move into Project Folder

```bash
cd AI_RESUME_BUILDER
```

## Step 3: Install Dependencies

```bash
npm install
```

---

# 🚀 Running the Project

## Start Frontend
npm install
npm run dev
```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Start Backend
cd backend
npm install
npm start
```bash
node server.js
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🔑 Environment Variables

Create a `.env` file in the root folder.

## Example

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=8080
```

---

# 🤖 Gemini API Integration

This project uses Google's Gemini API for:

- Resume optimization
- AI-generated summaries
- Cover letter generation

## Gemini API Setup

### Step 1
Visit Google AI Studio

### Step 2
Generate API Key

### Step 3
Add API key inside `.env`

```env
GEMINI_API_KEY=your_api_key
```

---

# 📡 API Endpoint

## Generate AI Response

```http
POST /generate
```

## Request Body

```json
{
  "prompt": "Generate professional resume summary"
}
```

## Example Response

```json
{
  "response": "Experienced software developer..."
}
```

---

# 💻 Usage

## Resume Builder
1. Enter personal details
2. Add skills and education
3. Add projects and experience
4. Generate AI-enhanced content

## Cover Letter Generator
1. Enter job role
2. Enter company details
3. Generate professional cover letter

---

# 🌐 Deployment

# 🚀 Frontend Deployment (Vercel)

## Step 1
Push project to GitHub

## Step 2
Import repository into Vercel

## Step 3
Add environment variable:

```env
VITE_API_URL=https://frontend-vercel.com
```

## Step 4
Deploy project

---

# 🚀 Backend Deployment (Render)

## Step 1
Push project to GitHub

## Step 2
Create Web Service on Render

## Step 3
Add environment variable:

```env
GEMINI_API_KEY=your_api_key
```

## Step 4
Deploy backend

---

# 🔒 Security

- API keys stored using `.env`
- Backend handles secure API requests
- Sensitive data hidden from frontend

---

# 🧪 Testing

## Frontend Testing
- Responsive UI testing
- Form validation
- API request testing

## Backend Testing
- API response testing
- Gemini API testing
- Error handling

---

# ⚠️ Troubleshooting

## npm install Error

Run:

```bash
npm cache clean --force
```

Then:

```bash
npm install
```

---

## Gemini API Error

### Solution
- Verify API key
- Restart backend server
- Check `.env` file

---

## CORS Error

Install CORS:

```bash
npm install cors
```

Enable CORS in `server.js`:

```javascript
app.use(cors())
```

---

# 🔮 Future Enhancements

- Resume PDF Download
- Multiple Resume Templates
- Authentication System
- Resume Score Analyzer
- Dark Mode
- AI Interview Questions
- Resume Sharing Feature

---

# 📚 Learning Outcomes

This project helps in learning:

- React Development
- Vite Configuration
- Node.js Backend
- Express.js APIs
- Gemini API Integration
- Deployment Process
- Full Stack Development

---


## Steps

1. Fork repository
2. Create branch

git add .
git commit -m "added feature"
git push

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create Pull Request

---

# 👩‍💻 Author

## Sharmila

- ECE Student
- AI & Full Stack Enthusiast
- Embedded Systems Learner



# 🌐 Live Demo

https://ai-resume-builder-six-kohl.vercel.app/


# 📂 GitHub Repository

https://github.com/Sharmy13/AI_RESUME_BUILDER

---

# 📜 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

- Give it a ⭐ on GitHub
- Share with friends
- Follow for more projects
