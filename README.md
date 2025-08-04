🚀 MERN Portfolio Website with Admin Panel
A modern, responsive portfolio website built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Bootstrap. This project includes a fully featured admin panel for easy content management and a sleek, professional frontend to showcase your work.

✨ Features
🌟 Frontend
Responsive, mobile-friendly layout powered by Bootstrap 5

Modern UI/UX with clean design and smooth animations

Dynamic project showcase with filtering and search

Contact form with validation and email notifications

Interactive skills section with progress bars

About section with personal and professional info

Resume/CV download feature

SEO optimized for better search engine visibility

🔧 Admin Panel
Secure JWT-based authentication system

CRUD operations for portfolio projects (add/edit/delete/reorder)

Image upload with preview and validation

View and manage contact form submissions

Rich text editor for project descriptions

Dashboard with analytics and insights

Profile management for personal info and skills

🛠️ Backend & Technical
RESTful API design

File upload support with validation and compression

Email integration for contact notifications

Optimized MongoDB schema with relations

Comprehensive error handling and input validation

Security features including password hashing, input sanitization, and CORS protection

🏗️ Tech Stack
Frontend: React.js, Bootstrap 5, React Router, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose

Authentication: JWT, Bcrypt

Validation: Validator.js

Deployment: Vercel (frontend), your choice for backend

📁 Project Structure
php
Copy
Edit
portfolio-website/
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page-level components
│   │   ├── context/            # React context providers
│   │   ├── utils/              # Utility functions
│   │   ├── styles/             # CSS files
│   │   └── App.js
│   └── package.json
├── server/                     # Express backend
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── middleware/             # Middleware functions
│   ├── utils/                  # Utility helpers
│   ├── server.js               # Express app entry point
│   └── package.json
├── uploads/                    # Uploaded images/files
├── .gitignore
└── README.md
🚀 Getting Started
Prerequisites
Node.js (v14+)

MongoDB (local or Atlas)

npm or yarn

Installation
Clone the repo

bash
Copy
Edit
git clone https://github.com/yourusername/your-repo.git
cd portfolio-website
Install backend dependencies

bash
Copy
Edit
cd server
npm install
Install frontend dependencies

bash
Copy
Edit
cd ../client
npm install
Configure environment variables

Create .env in the /server folder with:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_jwt_secret
PORT=5000
Run backend and frontend

Open two terminals:

Backend:

bash
Copy
Edit
cd server
npm run dev
Frontend:

bash
Copy
Edit
cd client
npm run dev
Visit app in browser

Frontend: http://localhost:5173

Admin Panel: http://localhost:5173/admin/login

Backend API: http://localhost:5000/api

📱 Usage
Visitors
Browse projects and skills

View live demos and GitHub repos

Download resume

Send messages via contact form

Admin
Login to admin panel

Manage projects and portfolio content

Review and respond to contact messages

Update profile and skills

🤝 Contributing
Contributions are welcome! Follow these steps:

Fork the repo

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push branch: git push origin feature-name

Open a Pull Request

📝 API Endpoints
Auth
POST /api/auth/login — Admin login

POST /api/auth/register — Create admin account

GET /api/auth/user — Get current user

Projects
GET /api/projects — List all projects

GET /api/projects/:id — Get project by ID (auth required)

POST /api/projects — Create project (auth required)

PUT /api/projects/:id — Update project (auth required)

DELETE /api/projects/:id — Delete project (auth required)

Contact
POST /api/contact — Submit contact form

GET /api/contact — List all messages (auth required)

PUT /api/contact/:id/read — Mark message as read (auth required)

License
MIT
