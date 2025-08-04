// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // require('dotenv').config();

// // const authRoutes = require('./routes/auth');
// // const projectRoutes = require('./routes/projects');
// // const contactRoutes = require('./routes/contact');

// // const app = express();

// // // ✅ Proper CORS setup
// // app.use(cors({
// //   origin: 'http://localhost:5173',
// //   credentials: true,
// // }));



// // // Middleware
// // app.use(express.json());

// // // Routes
// //  app.use('/api/auth', authRoutes);
// //  app.use('/api/projects', projectRoutes);
// //  app.use('/api/contact', contactRoutes);

// // // MongoDB Connection
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('✅ Connected to MongoDB'))
// //   .catch(err => console.error('❌ MongoDB connection error:', err));

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const projectRoutes = require('./routes/projects');
// const contactRoutes = require('./routes/contact');

// const app = express();

// const corsOptions = {
//   origin: 'http://localhost:5173',  // your frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
// };

// // CORS middleware
// app.use(cors(corsOptions));

// // Body parser middleware
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/contact', contactRoutes);

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact'); // ✅ Add this

app.use('/api/auth', authRoutes);
app.use('/api/projects', verifyToken, projectRoutes);
app.use('/api/contact', contactRoutes); // ✅ Mount contact route

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
