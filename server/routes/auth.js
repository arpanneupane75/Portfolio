// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const validator = require('validator')
// const User = require('../models/User');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { userId: user._id }, 
//       process.env.JWT_SECRET, 
//       { expiresIn: '7d' }
//     );

//     res.json({ 
//       token, 
//       user: { 
//         id: user._id, 
//         email: user.email 
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Register (for initial setup)
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if(!email || !password){
//       return res.status(400).json({message:"All fields are required."})
//     }
    
//     if(!validator.isEmail(email)){
//       return res.status(400).json({message:"Please enter valid email address."})
//     }

//     if(!validator.isStrongPassword(password)){
//       return res.status(400).json({message:"Please enter strong password."})
//     }
    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);
    
//     const user = new User({
//       email,
//       password: hashedPassword
//     });

//     await user.save();
    
//     const token = jwt.sign(
//       { userId: user._id }, 
//       process.env.JWT_SECRET, 
//       { expiresIn: '7d' }
//     );

//     res.status(201).json({ 
//       token, 
//       user: { 
//         id: user._id, 
//         email: user.email 
//       } 
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get('/user', auth ,async (req, res) => {
//   try {

   
//     return res.json({user:req.user})
    
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
// // const express = require('express');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const validator = require('validator');
// // const User = require('../models/User');
// // const auth = require('../middleware/auth');

// // const router = express.Router();

// // // Login
// // router.post('/login', async (req, res) => {
// //   try {
// //     let { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ message: 'Email and password are required.' });
// //     }

// //     email = email.trim().toLowerCase();

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ message: 'Invalid credentials: user not found.' });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(400).json({ message: 'Invalid credentials: incorrect password.' });
// //     }

// //     const token = jwt.sign(
// //       { userId: user._id },
// //       process.env.JWT_SECRET || 'fallback_secret',
// //       { expiresIn: '7d' }
// //     );

// //     return res.json({
// //       token,
// //       user: {
// //         id: user._id,
// //         email: user.email
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Login error:", error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Register
// // router.post('/register', async (req, res) => {
// //   try {
// //     let { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ message: 'All fields are required.' });
// //     }

// //     email = email.trim().toLowerCase();

// //     if (!validator.isEmail(email)) {
// //       return res.status(400).json({ message: 'Please enter a valid email address.' });
// //     }

// //     if (!validator.isStrongPassword(password)) {
// //       return res.status(400).json({ message: 'Please enter a strong password.' });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: 'User already exists.' });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 12);

// //     const newUser = new User({
// //       email,
// //       password: hashedPassword
// //     });

// //     await newUser.save();

// //     const token = jwt.sign(
// //       { userId: newUser._id },
// //       process.env.JWT_SECRET || 'fallback_secret',
// //       { expiresIn: '7d' }
// //     );

// //     return res.status(201).json({
// //       token,
// //       user: {
// //         id: newUser._id,
// //         email: newUser.email
// //       }
// //     });
// //   } catch (error) {
// //     console.error("Registration error:", error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // // Get current user
// // router.get('/user', auth, async (req, res) => {
// //   try {
// //     return res.json({ user: req.user });
// //   } catch (error) {
// //     console.error("Fetch user error:", error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// // module.exports = router;
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const validator = require('validator');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Register route
// router.post('/register', async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     email = email.trim().toLowerCase();

//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ message: 'Invalid email address.' });
//     }

//     if (!validator.isStrongPassword(password)) {
//       return res.status(400).json({ message: 'Password is not strong enough.' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     const token = jwt.sign(
//       { userId: newUser._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(201).json({
//       token,
//       user: { id: newUser._id, email: newUser.email },
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   try {
//     let { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required.' });
//     }

//     email = email.trim().toLowerCase();

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials.' });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.json({
//       token,
//       user: { id: user._id, email: user.email },
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get current user route (protected)
// router.get('/user', auth, async (req, res) => {
//   try {
//     // req.user is set by auth middleware
//     res.json({ user: req.user });
//   } catch (error) {
//     console.error('Get user error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: 'Invalid email address.' });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({ message: 'Password not strong enough.' });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists.' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/user - get current user info (protected)
router.get('/user', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
