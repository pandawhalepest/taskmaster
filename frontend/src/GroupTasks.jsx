import { useState } from 'react';

export default function GroupTasksApp() {
  const [groupTask, setGroupTask] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveHandler = () => {
    
  }

  return (
    <>
      <div className='group-task-box'>
        <h1>GROUP TASKS</h1>
      </div>
      <div className='task-box-items'>
        <input
          type='text'
          value={popUpText}
          id='input-form'
          onChange={(e) => setPopUpText(e.target.value)}
          placeholder='Enter tasks here'
        ></input>
        <button id='add-group-task-button' onClick={() => setPopUp(true)}>
          Add Task
        </button>
        {popUp && (

        )}

      </div>
    </>
  );
}
