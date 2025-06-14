import express from 'express';
import connectDB from './config/database.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

connectDB();

const app = express();

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
