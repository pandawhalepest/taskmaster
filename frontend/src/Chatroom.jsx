import { useState, useEffect } from 'react';
export default function Chatroom() {
  //store firstnames from user database
  const [firstNames, setFirstNames] = useState([]);
  //stores user inputs of sender and content info
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');
  //stores authors and messages from fetched data
  const [message, setMessage] = useState([]);

  //get first names everytime component mounts
  useEffect(() => {
    getFirstName();
  }, []);
  //sending get request to get firstnames from data we receive
  async function getFirstName() {
    //try catch block
    try {
      //fetch endpoint for get request
      const response = await fetch('/api/login');
      //if response fails send eroor
      if (!response.ok) {
        throw new Error('response failed');
      }
      //parse response
      const data = await response.json();
      console.log(data);
      //store array with firstnames in variable
      const names = data.map((users) => users.firstName);
      //create a set for unique names
      const uniqueNames = new Set(names);
      //turn set into array
      const namesArray = Array.from(uniqueNames);
      //set first names to new array
      setFirstNames(namesArray);
      setSender(namesArray[0]);
    } catch (error) {
      //log thrown error if response fails
      console.log(error);
    }
  }

  // sending post request to post users message
  async function postMessage(e) {
    // prevent browswer refresh when submitting message
    e.preventDefault();
    //try catch block
    try {
      //sending post request with content type headers and strigified sender and content values
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender, content }),
      });
      //if respones fails throw error
      if (!response.ok) {
        throw new Error('response failed');
      }
      //parse data
      const data = await response.json();
      console.log(data);
      // invoke getMessages immediately after user posts a message
      await getMessages();
      setContent(''); //? ST: To clear chat area!
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }
  // sending get request to access previous and upcoming messages
  async function getMessages() {
    //try catch block
    try {
      //sending get request
      const response = await fetch('/api/messages');
      //if response fails throw error
      if (!response.ok) {
        throw new Error('response failed');
      }
      //parse data
      const data = await response.json();
      console.log(data);
      //set messages with a new array with each element being the author and message from data we recieved
      const messages = data.map(
        (mess) => ({ sender: mess.sender, content: mess.content}) //? ST: Adjusted to have more control over the input
      );
      setMessage(messages);
    } catch (error) {
      //log thrown error
      console.log(error);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div id="chatroom">
      <div id="messages">
        {/* had to look this one up since i didnt know that we had to use slice in order not to mutate original state */}
        {/* display each element from message in reverse so we can see latest messages when interacting */}
        {message
          .slice()
          .reverse()
          .map((mess, index) => (
            <div key={index} className={mess.sender === sender? 'my-message' : 'other-message'}> {/* ST: Adjusted map to take in different users */}
              <p style={{ whiteSpace: 'pre-line' }}>
                <strong>{mess.sender}: </strong> {mess.content} 
              </p>
            </div>
          ))}
      </div>
      {/* sending a message area */}
      <form id="send-message" onSubmit={postMessage}>
        {/* using a dropdown menu for the author of the message */}
        <select
          id="author"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        >
          {/* map over the firstnames array to add each first name as a value in the dropdown menu */}
          {firstNames.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
        {/* text box to write a message */}
        <textarea
          id="message-input"
          placeholder="send a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* send message button */}
        <button id="message-submit" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
