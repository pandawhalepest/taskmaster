import Message from '../models/messageModel.js';

export const postMessage = async (req, res) => {
  const {sender, content} = req.body
  try {
    const message = await Message.create({sender, content})
    res.status(200).json(message);
  } catch(error) {
     res.status(500).json({error: error})
  }
}

export const getMessages = async (req, res) => {
    try {
 const allMessages = await Message.find({})
 res.status(200).json(allMessages)
    }catch(error) {
        res.status(500).json({error: error})
    }
}