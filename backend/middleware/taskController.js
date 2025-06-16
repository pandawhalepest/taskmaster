import Task from '../models/taskModel.js';

// ✅ Middleware to post a generic task (from frontend-navbar)
export const postTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const postedTask = await Task.create({ title, description });
    res.locals.postedTask = postedTask;
    return next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Middleware to get all tasks for a user (from main)
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}); // assumed you want all tasks, not one
    res.locals.tasks = tasks;
    return next();
  } catch (error) {
    return next(error);
  }
};

// ✅ Middleware to assign a task to a user (from main)
export const assignTask = async (req, res, next) => {
  try {
    const { user, description } = req.body;

    const newTask = new Task({
      user: user._id, // assuming user object is passed
      description,
    });

    await newTask.save();
    res.locals.task = newTask;
    return next();
  } catch (error) {
    return next(error);
  }
};