import Message from '../models/messageModel.js';

export const postMessage = async (req, res, next) => {
  const {sender, content} = req.body
  try {
    const message = await Message.create({sender, content})
    res.locals.message = message
   return next();
  } catch(error) {
     res.status(500).json({error: error})
  }
}

export const getMessages = async (req, res, next) => {
    try {
 const allMessages = await Message.find({})
 res.locals.allMessages = allMessages
return next()
    }catch(error) {
        res.status(500).json({error: error})
    }
}