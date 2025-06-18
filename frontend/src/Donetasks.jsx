import { useState, useEffect } from 'react';
export default function Donetasks({ doneTask, refreshDoneTasks }) {
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
      refreshDoneTasks(); //? ST: Added to refresh the done tasks
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
