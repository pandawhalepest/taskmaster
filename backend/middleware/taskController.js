import Task from '../models/taskModel.js';


// ? Middleware to handle task creation 
// ? Get tasks for user 

const controller = {}

export const getTasks = async (req, res, next) => {
    try{
        // ! declaring variables to store the users inputs by requesting the data from the body. 
        
        const userId = req.user._id
        
         // ! declared a variable to store our found user then using the mongoose findOne method we find the user
        const tasks = await Task.findOne({user: userId});
        
        // ! next 
         res.locals.tasks = tasks;
        
        return next();
     }  catch (error) {
        return (error)
     }
};

export const assignTask = async (req, res, next) => {
    try {
       
        // ! declaring variables to store the users inputs by requesting the data from the body. 
        const { user, description } = req.body;
        
        // ! creating a new task using the mongoose model
        const newTask = Task.create({ 
            user: user._id, 
            description: description,
         });
       
        // ! saving the new task to the database
        await newTask.save();
        res.locals.task = newTask;
        return next();
    }   catch (error) {
        return next(error);
    }
};


