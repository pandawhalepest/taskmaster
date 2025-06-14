import bycrpyt from 'bcrypt';
import User from '../models/userModel.js';
import Task from '../models/taskModel.js';


// Middleware to handle task creation 
// Get tasks for user 

controller.getTasks = async (req, res, next) => {
    try{
        const userId = req.user.id || req.body.user
    }
}




