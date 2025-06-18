import { useState, useEffect } from 'react';
export default function Noteboard() {
  //store done tasks
  const [doneTask, setDoneTask] = useState([]);
  const [taskName, setTaskName] = useState('');
  //refresh invoking get tasks on mount
  useEffect(() => {
    getTasks();
  }, [...doneTask]);
  // async function to get tasks from database
  async function getTasks() {
    //try catch block
    try {
      //fetch at endpoint at api task
      const response = await fetch('/api/task');
      //if response fails throw error
      if (!response.ok) {
        throw new Error('response failed');
      }
      //parse data
      const data = await response.json();
      console.log(data);
      //map our data for only the task names and store in variable
      const tasks = data.map((tasks) => tasks.title);
      // add all unique names to a variable
      const uniqueTasks = new Set(tasks);
      //turn the unique names from set to array
      const newTasks = Array.from(uniqueTasks);
      //set done tasks to the arary with unique name tasks
      setDoneTask(newTasks);
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }

  //async function to delete all tasks when button is clicked
  async function deleteTasks() {
    //try catch block
    try {
      //fetch at endpoint api task and use delete method and content tyype headesr
      const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //check if response fails if it does throw response failed
      if (!response.ok) {
        throw new Error('response failed');
      }
      //parse data
      const data = await response.json();
      console.log(data);
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }
  return (
    // testing and using as template
    <div id='done-tasks'>
      {/* display done tasks */}
      <h2 className='task-head'>Done Tasks</h2>
      <ul>
        {/* map our done tasks array with our task names that are done */}
        {doneTask.map((taskName, index) => (
          <div key={index} id='tasks'>
            {/* display each task name */}
            <li>{taskName}</li>
          </div>
        ))}
        {/* button to delete all tasks */}
        <button onClick={deleteTasks} className='delete-tasks-button'>
          Delete Tasks
        </button>
      </ul>
    </div>
  );
}
