// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({

// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
  
// // }, { timestamps: true });

// // module.exports = mongoose.model('User', userSchema);
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required']
//   }
// }, {
//   timestamps: true
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
