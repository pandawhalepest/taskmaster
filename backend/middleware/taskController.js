import Task from '../models/taskModel.js';
export const postTask = async (req, res, next) => {
  const {title, description} = req.body
  try {
    const postedTask = await Task.create({title: title, description: description})
    res.locals.postedTask = postedTask
   return next()
  } catch(error) {
     res.status(500).json({error: error})
  }
}