// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User');

// // const auth = async (req, res, next) => {
// //   try {
// //     // Allow OPTIONS requests to pass through for CORS preflight
// //     if (req.method === 'OPTIONS') {
// //       return next();
// //     }

// //     const token = req.header('Authorization')?.replace('Bearer ', '');
    
// //     if (!token) {
// //       return res.status(401).json({ message: 'Access denied' });
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     const user = await User.findById(decoded.userId).select("-password");
    
// //     if (!user) {
// //       return res.status(401).json({ message: 'Invalid token' });
// //     }

// //     req.user = user;
// //     next();
// //   } catch (error) {
// //     res.status(401).json({ message: 'Invalid token' });
// //   }
// // };

// // module.exports = auth;
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const auth = async (req, res, next) => {
//   try {
//     // Allow OPTIONS method to pass (for CORS preflight)
//     if (req.method === 'OPTIONS') return next();

//     const authHeader = req.header('Authorization');
//     if (!authHeader) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.userId).select('-password');

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid token: user not found.' });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Invalid token.' });
//   }
// };

// module.exports = auth;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header ("Bearer <token>")
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID embedded in token, exclude password field
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token: user not found.' });
    }

    req.user = user; // Attach user to request object
    next();          // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;
