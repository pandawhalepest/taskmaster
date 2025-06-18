import Message from '../models/messageModel.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
//use(cookieParser());
dotenv.config();
export const tokenVerifier = (req, res, next) => {
  const cookie = req.headers.cookie;
  console.log('cookie!!!!!!!', cookie);
  const token = req.cookies.accessToken;
  console.log('**** token', token);
  console.log('SECRET', process.env.ACCESS_TOKEN_SECRET);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log('jwt verify error', err);

      res.sendStatus(403);
    }
    console.log('entered jwt verify');
    console.log('user in jwt verify', user);
    console.log('body yser', req.body.user);
    console.group('body', req.body);
    if (user == req.body.sender) {
      console.log('right user');
      next();
    } else {
      next({
        log: 'Error in token verifier; user not authorized',
        status: 400,
        message: { err: 'Wrong user!!!' },
      });
    }
  });

  // next();
};

export const postMessage = async (req, res, next) => {
  const { sender, content } = req.body;
  try {
    const message = await Message.create({ sender, content });
    res.locals.message = message;
    return next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const allMessages = await Message.find({});
    res.locals.allMessages = allMessages;
    return next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
