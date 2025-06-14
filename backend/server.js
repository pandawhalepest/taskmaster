import express from 'express';
import connectDB from './config/database.js';
import { signup, login, getUsers, deleteUser} from './middleware/userController.js';
import {postMessage, getMessages} from './middleware/messageController.js'
import dotenv from 'dotenv';
import { getTasks, assignTask } from './middleware/taskController.js'; 

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
//post request for signup
app.post('/api/signup', signup, (req, res) => {
     res.status(200).json({
    message: res.locals.message,
    user: res.locals.user,
  });
}); 

//post request for login
app.post('/api/login', login, (req, res) => {
      res.status(200).json({
    message: res.locals.message,
    user: res.locals.user,
  })
});

//get request for login
app.get('/api/login', getUsers, (req, res) => {
    res.status(200).json(res.locals.users)
})

//delete request for users
app.delete('/api/users', deleteUser, (req, res) => {
      res.status(200).json({ message: 'User deleted', user: res.locals.deletedUser });
})

//post request for messages
app.post('/api/messages', postMessage, (req, res) => {
     res.status(200).json(res.locals.message);
})

//get request for messages
app.get('/api/messages', getMessages, (req, res) => {
     res.status(200).json(res.locals.allMessages)
})

app.get('/api/task', getTasks, (req, res) => {
    //get tasks logic here
    res.send('Get tasks endpoint');
});

app.post('/api/task',assignTask, (req, res) => {
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
