# 🚀 CodeCompass AI

> An AI-powered career guidance platform that helps users analyze resumes, check ATS compatibility, identify skill gaps, generate career roadmaps, prepare for interviews, and estimate salaries.

## 🌐 Live Demo

🚧 Coming soon

## 📌 Project Overview

CodeCompass AI is a full-stack web application designed to help students and job seekers navigate their career journey using AI-powered tools.

The platform provides multiple career-focused tools in one application, including resume analysis, ATS checking, interview preparation, personalized career roadmaps, skill gap detection, and salary prediction.

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT-based Authentication
- Password Security
- User Data Storage

### 📄 Resume Analyzer

- Upload PDF and DOCX resumes
- Extract resume content
- Analyze resume information
- Generate improvement suggestions
- Store resume analysis data

### 🤖 ATS Checker

- Analyze resume compatibility
- Compare resume content with ATS requirements
- Identify missing keywords
- Provide an ATS compatibility score

### 🎤 Interview Coach

- Practice interview questions
- Generate role-based interview questions
- Receive feedback and suggestions

### 🗺️ Career Roadmap

- Select a target career
- Generate a personalized learning roadmap
- Identify important technologies and skills
- Follow a structured career path

### 📊 Skill Gap Detection

- Select a target job role
- Compare existing skills with required skills
- Identify missing skills
- Get recommendations for improvement

### 💰 Salary Predictor

- Estimate salary based on:
  - Skills
  - Experience
  - Job Role
  - Location

### 📈 Dynamic Platform Statistics

The landing page displays dynamic statistics retrieved from the backend, including:

- Registered Users
- Resumes Analyzed
- Available AI Career Tools

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Framer Motion
- React Icons
- CSS

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- Multer

### Database

- MongoDB
- Mongoose

## 🏗️ Project Architecture

```text
                    ┌───────────────────┐
                    │   React + Vite    │
                    │    Frontend       │
                    └─────────┬─────────┘
                              │
                           REST API
                              │
                              ▼
                    ┌───────────────────┐
                    │ Node.js + Express │
                    │     Backend       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ MongoDB Database  │
                    └───────────────────┘
```

## 📂 Project Structure

```text
CodeCompass-AI/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── landing/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── styles/
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB

### 1. Clone the Repository

```bash
git clone https://github.com/RVDarshan06/CodeCompass-AI.git
```

### 2. Install Frontend Dependencies

```bash
cd CodeCompass-AI/client
npm install
```

### 3. Install Backend Dependencies

Open another terminal:

```bash
cd CodeCompass-AI/server
npm install
```

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

⚠️ **Never commit your `.env` file to GitHub.**

Make sure your `.gitignore` includes:

```text
node_modules/
.env
uploads/
dist/
```

## ▶️ Run the Application

### Start the Backend

Inside the `server` folder:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### Start the Frontend

Inside the `client` folder:

```bash
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

Open the frontend URL in your browser to use CodeCompass AI.

## 🔗 API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Resume

```text
POST /api/resume/analyze
```

### Statistics

```text
GET /api/stats
```

## 🔒 Security

The project currently includes or is designed to include security practices such as:

- Password hashing
- JWT authentication
- Environment variables for secrets
- File upload restrictions
- File size limits
- Protected API routes
- Input validation
- CORS configuration

## 📱 Main Pages

- Landing Page
- Login
- Register
- Dashboard
- Resume Analyzer
- ATS Checker
- Interview Coach
- Career Roadmap
- Skill Gap Detection
- Salary Predictor

## 🚧 Future Improvements

- Advanced AI-powered resume analysis
- Improved ATS scoring
- AI-generated interview feedback
- Resume history for each user
- User profile management
- Email verification
- Password reset functionality
- Premium subscription plans
- Admin dashboard
- Improved analytics
- Cloud storage for uploaded resumes
- Production deployment

## 👨‍💻 Author

**R V Darshan**

GitHub: [@RVDarshan06](https://github.com/RVDarshan06)

## 📄 License

This project is currently intended for educational and portfolio purposes.

© 2026 R V Darshan. All Rights Reserved.