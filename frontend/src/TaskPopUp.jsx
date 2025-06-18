import { useState } from 'react';

function TaskPopUp({ onSave, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      description: description.trim(),
    });
    onClose();
  };

  return (
    <div className='popUpBox' onClick={onClose}>
      <div className='popUpBoxItems' onClick={(e) => e.stopPropagation()}>
        <h4>Add Group Task</h4>
        <form onSubmit={submitHandler}>
          <label htmlFor='title'>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label className='DescriptionBox'>
            <span className='desc-text'>Description</span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className='save-close-buttons'>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TaskPopUp;
