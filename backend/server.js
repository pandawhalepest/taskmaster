import express from 'express';
import connectDB from './config/database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {
  signup,
  login,
  getUsers,
  deleteUser,
} from './middleware/userController.js';
import {
  tokenVerifier,
  postMessage,
  getMessages,
} from './middleware/messageController.js';
import {
  postTask,
  getTasks,
  deleteTasks,
} from './middleware/taskController.js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

connectDB();

const app = express();

// Debug middleware
app.use((req, res, next) => {
  // console.log(`${req.method} ${req.path}`);
  //console.log('Headers:', req.headers);
  //console.log('Body:', req.body);
  next();
});

const PORT = process.env.PORT || 3000;

// middleware for Json parsing
app.use(express.json());

//for cookies
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.get('/', getTasks, (req, res) => {
  console.log('we are connected at the root endpoint');
  //res.cookie('emily', 'hi');
  res.send('API is running...');
});

// Import routes
//post request for signup
app.post('/api/signup', signup, (req, res) => {
  //console.log(res.locals.user);

  res.status(200).json({
    message: res.locals.message,
    user: res.locals.user,
  });
});

//post request for login
app.post('/api/login', login, (req, res) => {
  //?Start new session? need to store access token

  res.status(200).json({
    message: res.locals.message,
    user: res.locals.user,
  });
});

//get request for login
app.get('/api/login', getUsers, (req, res) => {
  res.status(200).json(res.locals.users);
});

//delete request for users
app.delete('/api/users', deleteUser, (req, res) => {
  res
    .status(200)
    .json({ message: 'User deleted', user: res.locals.deletedUser });
});

//post request for messages
app.post('/api/messages', tokenVerifier, postMessage, (req, res) => {
  //console.log('postMessage', req);
  console.log('auth!!!', req.headers['cookie']);
  res.status(200).json(res.locals.message);
});

//get request for messages
app.get('/api/messages', getMessages, (req, res) => {
  res.status(200).json(res.locals.allMessages);
});

app.post('/api/task', postTask, (req, res) => {
  res.status(200).json(res.locals.postedTask);
});

app.get('/api/task', getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.delete('/api/task', deleteTasks, (req, res) => {
  res.status(200).json(res.locals.deletedTasks);
});

// app.delete('/api/task/:username', (req, res) => {
//     //delete task logic here
//     res.send(`Delete task for user: ${req.params.username}`);
// });

// app.get('/api/chat', (req, res) => {
//     //get chat logic here
//     res.send('Get chat endpoint');
// });
// app.post('/api/chat', (req, res) => {
//     //create chat logic here
//     res.send('Create chat endpoint');
// });

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
