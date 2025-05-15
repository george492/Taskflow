require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../Backend/models/User'); // Adjust path as needed

const PEPPER = 'your-secret-pepper'; // Should match what's in authController.js

// Sample users data
const usersToAdd = [
  {
    name: 'Admin User',
    email: 'admin@taskflow.com',
    password: 'Admin@123',
    profileImage: '',
    rating: 0,
    numOfRatings: 0
  },
  {
    name: 'Manager User',
    email: 'manager@taskflow.com',
    password: 'Manager@123',
    profileImage: '',
    rating: 0,
    numOfRatings: 0
  },
  {
    name: 'Regular User',
    email: 'user@taskflow.com',
    password: 'User@123',
    profileImage: '',
    rating: 0,
    numOfRatings: 0
  }
];

async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

async function createUsers() {
  try {
    await connectDB();
    
    for (const userData of usersToAdd) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password with pepper
      const hashedPassword = await bcrypt.hash(userData.password + PEPPER, 10);
      
      // Create new user
      const newUser = new User({
        ...userData,
        password: hashedPassword
      });

      await newUser.save();
      console.log(`User ${userData.email} created successfully`);
    }
    
    console.log('All users processed');
    process.exit(0);
  } catch (err) {
    console.error('Error creating users:', err);
    process.exit(1);
  }
}

createUsers();