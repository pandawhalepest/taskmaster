import {useState, useEffect} from 'react'
export default function Noteboard() {
  //store done tasks
   const [doneTask, setDoneTask] = useState([])
   //refresh invoking get tasks on mount
useEffect(() => {
  getTasks()
    //   const intervalId = setInterval(getTasks, 1000); // fetch every 5 seconds

    // return () => clearInterval(intervalId); 
}, [])
// async function to get tasks from database
async function getTasks () {
  //try catch block
  try {
    //fetch at endpoint at api task
    const response = await fetch('/api/task')
    //if response fails throw error
    if(!response.ok) {
      throw new Error('response failed')
    }
    //parse data
    const data = await response.json()
    console.log(data)
    //map our data for only the task names and store in variable
   const tasks = data.map(tasks => tasks.title)
   // add all unique names to a variable
   const uniqueTasks = new Set(tasks)
   //turn the unique names from set to array
   const newTasks = Array.from(uniqueTasks)
   //set done tasks to the arary with unique name tasks
   setDoneTask(newTasks)
  } catch (error) {
    //log thrown error
    console.log(error)
  }
}
  return (
    // testing and using as template
    <div id="done-tasks">
      {/* display done tasks */}
      <h1>Done Tasks</h1>
      <ul>
        {/* map our done tasks array with our task names that are done */}
        {doneTask.map((value, index)=> (
          <div key ={index} id="tasks">
            {/* display each task name */}
          <li>{value}</li>
          {/* delete. button */}
          <button>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
