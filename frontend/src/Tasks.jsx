import { useState, useEffect } from 'react';

export default function Tasks({ onTaskDone }) {
  //store first name user
  const [firstNames, setFirstNames] = useState([]);
  //store user tasks to value of their task name
  const [tasks, setTasks] = useState({});
  //store task status whether done or not
  const [taskStatus, setTaskStatus] = useState({});
  //store inputted task name and description
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  //? ST: Flipped Card functionality
  const [flipped, setFlipped] = useState([]);

  //invoke our first name function on mount
  useEffect(() => {
    getFirstName();
  }, []);

  //async function for our get request of first names
  async function getFirstName() {
    //try catch block
    try {
      //fetch our data from api login endpoint
      const response = await fetch('/api/login');
      //if response fails throw error
      if (!response.ok) throw new Error('response failed');
      //parse data
      const data = await response.json();
      // map data to have new array of our first names and store in variable
      const newNames = data.map((user) => user.firstName);
      //only grab unique first names
      const firstN = new Set(newNames);
      //turn unique names into array instead of using set
      const names = Array.from(firstN);
      //set firstnames to our array of unique firstnames
      setFirstNames(names);
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }
  //async function for our delete request
  async function deleteUser(name) {
    //try catch block
    try {
      //fetch at api users endpoint with delete method, content type headers, and stringifying our passed in data as body
      const response = await fetch('/api/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', credentials: 'include' },
        body: JSON.stringify({ name }),
      });
      //if response fails throw error
      if (!response.ok) throw new Error('response failed');
      //set first names with all our previous first names without our passed in name
      setFirstNames((old) => old.filter((user) => user !== name));
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }

  //our function to add all tasks to the user that created it
  function addTasks(user) {
    //set tasks keeping our previous key value pairs and adding inputted tasks to the passed in user
    setTasks((old) => ({
      //spread existing tasks for all users
      ...old,
      //add a new blank task object with default properties for specidiic user
      [user]: [
        ...(old[user] || []),
        { task: '', desc: '', done: false, completed: false },
      ],
    }));
  }

  //our function to mark a specific task as assigned for the given user
  function markAssigned(user, index, taskText, descText) {
    //update the task at the given index for the user by setting task text, description, and marking it as done
    setTasks((prev) => {
      //copy the user's current tasks
      const updated = [...prev[user]];
      //update specific task
      updated[index] = {
        ...updated[index],
        task: taskText,
        desc: descText,
        done: true,
      };
      //return updated state with modified task list for the user
      return { ...prev, [user]: updated };
    });
  }

  //async function for post rquest to post our task and descirption to database
  async function markCompleted(user, index) {
    //!user is the user that the task belongs to, not the user youre signed in as
    console.log('this is the user in markcompleted', user);
    //decalre variable to store our tasks
    const taskData = tasks[user][index];
    //variable for task name
    const title = taskData.task;
    //varaible for task description
    const description = taskData.desc;
    //try catch block
    try {
      //fetch at endpoint api/task with method post, content-type headers, body being strigfyed task and description variables
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
          //!add token to header (roles too?)
          'Content-Type': 'application/json',
          credentials: 'include',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      //if reseposne fails throw error
      if (!response.ok) {
        throw new Error('response failed');
      }
      //parse data
      const data = await response.json();
      console.log(data);
      if (onTaskDone) {
        console.log('task done');
        onTaskDone();
      } //? ST: Bringing this prop in just to update the useState up the ladder

      //our function to mark a task as completed for the given user
      setTasks((prev) => {
        //copy the current list of tasks for the user
        const updated = [...prev[user]];
        //update the specific task to mark it as completed
        updated[index] = { ...updated[index], completed: true };
        //return the new state with the updated task list for the user
        return { ...prev, [user]: updated };
      });
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }

  //? ST: Function to flip cards
  function handleFlip(user, taskIndex) {
    setFlipped((prev) => ({
      ...prev,
      [`${user}-${taskIndex}`]: !prev[`${user}-${taskIndex}`], //? ST: Setting it as a key value pair that is assigned to the Flipped useState
    }));
  }

  return (
    <div id='firstnames'>
      {/* map through our firstnames array */}
      {firstNames.map((user, index) => (
        <div key={index} id='user-column'>
          {/* display our users name */}
          <h2>{user.toUpperCase()}</h2>
          <div id='user-buttons'>
            {/* map our tasks  */}
            {(tasks[user] || []).map((taskObj, taskIndex) => {
              //desctrucitng taskObj
              const { task, desc, done, completed } = taskObj;
              //   background color for when they click done with tasks
              const backgroundColor = completed ? '#44ac64' : '#dc4444';
              return (
                <div
                  key={taskIndex}
                  id='cards'
                  className={flipped[`${user}-${taskIndex}`] ? 'flipped' : ''}
                  style={{ backgroundColor }}
                  onClick={() => handleFlip(user, taskIndex)}
                >
                  {!flipped[`${user}-${taskIndex}`] ? (
                    <div id='cards-texts' className="card-front">Parker's stuff</div>
                  ) : (
                    <div id='cards-texts' className="card-back">
                    {!done ? (
                    //display form to enter task and description
                    <form
                      id='cards-texts'
                      onClick={e => e.stopPropagation()}
                      onSubmit={(e) => {
                        //prevent default page refresh
                        e.preventDefault();
                        //get task input value
                        const taskText =
                          e.target.querySelector('#user-task').value;
                        //get descirption input value
                        const descText =
                          e.target.querySelector('#description').value;
                        //call function to assign task with values
                        markAssigned(user, taskIndex, taskText, descText);
                      }}
                    >
                      <input
                        type='text'
                        id='user-task'
                        placeholder='Add task...'
                      />
                      <textarea
                        id='description'
                        placeholder='Add description...'
                      />

                      <button type='submit' className='add-button'>
                        Add
                      </button>
                    </form>
                  ) : (
                    //if task is already done, display it along with description
                    <div id='cards-texts'>
                      {/* display the task name */}
                      <h4>{task}</h4>
                      {/* display the task description */}
                      <p>{desc}</p>
                      {/* if task is not completed yet, show 'Done with task' button */}
                      {!completed && (
                        // button for done with task and onclick pass in user and taskIndex to our mark comopleted funciton
                        <button
                          className='done-button'
                          onClick={() => markCompleted(user, taskIndex)}
                        >
                          Done with task
                        </button>
                      )}
                    </div>
                  )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div id='buttons'>
            {/* button to add new task for the user */}
            <button className='add-task-button' onClick={() => addTasks(user)}>
              Add Task
            </button>
            {/* button to remove user */}
            <button
              className='delete-user-button'
              onClick={() => deleteUser(user)}
            >
              Delete User
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
