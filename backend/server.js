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

// middleware for Json parsing
app.use(express.json());

app.get('/', (req, res) => {
    console.log('we are connected at the root endpoint');
  res.send('API is running...');
});

// Import routes
app.post('/api/signup', (req,res) => {
     //signup logic here
    res.send('Signup endpoint');
}) 

app.post('/api/login', (req, res) => {
    //login logic heregit 
    res.send('Login endpoint');
});

app.get('/api/task', (req, res) => {
    //get tasks logic here
    res.send('Get tasks endpoint');
});

app.post('/api/task', (req, res) => {
    //create task logic here
    res.send('Create task endpoint');
});

app.delete('/api/task/:username', (req, res) => {
    //delete task logic here
    res.send(`Delete task for user: ${req.params.username}`);
});

app.get('/api/chat', (req, res) => {
    //get chat logic here
    res.send('Get chat endpoint');
});
app.post('/api/chat', (req, res) => {
    //create chat logic here
    res.send('Create chat endpoint');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
