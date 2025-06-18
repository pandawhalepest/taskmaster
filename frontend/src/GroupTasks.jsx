import { useState } from 'react';
import TaskPopUp from "./TaskPopUp";

export default function GroupTasks({ groupTasks, setGroupTasks }) {

  const [showPopUp, setShowPopUp] = useState(false);

  const addGroupTask = (task) => setGroupTasks((prev) => [...prev, task]);

  return (
    <>
      <div className='group-task-box'>
        <h3>GROUP TASKS</h3>

        {groupTasks.length === 0 ? (
            <p className="no-tasks">No tasks yet...</p>
        ): (
            <ul className="group-task-list">
                {groupTasks.map((task, index) => (
                    <li key={index}>
                        <strong>{task.title}</strong>
                        {task.description && <> - {task.description}</>}
                    </li>
                ))}
            </ul>
        )}
      </div>
      <div className='task-box-items'>
        <button id='add-group-task-button' onClick={() => setShowPopUp(true)}>
          Add Task
        </button>
        {showPopUp && (
            <TaskPopUp onSave={addGroupTask} onClose={() => setShowPopUp(false)}/>
        )}
      </div>
    </>
  );
}
