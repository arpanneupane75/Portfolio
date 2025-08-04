const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('./models/User');

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = 'admin@yourdomain.com';
  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log('Admin user already exists.');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash('AdminPassword123', 12);

  const adminUser = new User({
    email,
    password: hashedPassword,
    role: 'admin',
  });

  await adminUser.save();
  console.log(`Admin user created with email: ${email} and password: AdminPassword123`);
  process.exit();
}

createAdmin().catch(console.error);
