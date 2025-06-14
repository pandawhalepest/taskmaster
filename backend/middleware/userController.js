import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

// Signup Controller
export const signup = async (req, res) => {
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

    // Create new user (password will be hashed by pre-save hook)
    const user = new User({ username, password, firstName, lastName });
    await user.save();

    res
      .status(201)
      .json({
        message: 'User created successfully',
        user: { username, firstName, lastName },
      });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Login Controller
export const login = async (req, res) => {
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
    res.json({
      message: 'Login successful',
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
