import { useState, useEffect } from 'react';
import Chatroom from './Chatroom.jsx';
import Noteboard from './Noteboard.jsx';
import Donetasks from './Donetasks.jsx';
import GroupTasksApp from './GroupTasks.jsx';

export default function Home() {
  const [doneTask, setDoneTask] = useState([]); //? ST: Bringing up this component since it needs access to things in two diff componenets
  const [groupTasks, setGroupTasks] = useState([]);

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
      setDoneTask(Array.from(uniqueTasks));
      //set done tasks to the arary with unique name tasks
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);
  
  return (
    <div id="home">
      {/* passing in our chatroom component first */}
      <Chatroom groupTasks={groupTasks} setGroupTasks={setGroupTasks}/>
      {/* passing in our noteboard component next */}
      <Noteboard onTaskDone={getTasks} groupTasks={groupTasks}/>
      {/* passing in our donetasks component last */}
      <Donetasks doneTask={doneTask} refreshDoneTasks={getTasks}/>
    </div>
  );
}
