import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
//require('dotenv').config();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Signup Controller
export const signup = async (req, res, next) => {
  console.log('entering signup');
  try {
    const { username, password, firstName, lastName } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already taken.' });
    }

    // Create new user
    const user = new User({ username, password, firstName, lastName });
    await user.save();

    res.locals.message = 'User created successfully';

    res.locals.user = {
      id: user._id,
      username,
      firstName,
      lastName,
    };
    return next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login Controller
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required.' });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    //create accessToken
    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
    console.log('accessToken created as: ', accessToken);

    res.locals.user = {
      id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      accessToken: accessToken,
    };
    res.locals.message = 'Login successful';
    return next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.locals.users = users;
    return next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const deleteUser = async (req, res, next) => {
  const { name } = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({ firstName: name });
    res.locals.deletedUser = deletedUser;
    return next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
