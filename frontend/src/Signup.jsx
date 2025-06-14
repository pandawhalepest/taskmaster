import { useState } from 'react';

export default function Signup() {
  // store username, password, firstname, lastname inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // invoke useNavigate to be able to route the page to login once user signs up
  // const navigate = useNavigate();

  // async function to send post request to backend to create user once user signs up
  async function postSignUp(e) {
    // prevent browser refresh when submitting signup
    e.preventDefault();
    // try catch block
    try {
      // send post request with post method, content-type headers, and body stringifying out username, password, firstname, lastname
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName }),
      });
      // if response fails send error
      if (!response.ok) {
        throw new Error('response failed');
      }
      // store our requested data in data variable
      const data = await response.json();
      console.log(data);
      // navigate to login after successful signup
      // navigate('/login');

      // set username, password, firstname, lastname inputs to an empty string once user signs up
      setUsername('');
      setPassword('');
      setFirstName('');
      setLastName('');
    } catch (error) {
      // log our thrown error if response fails
      console.log(error);
    }
  }

  return (
    <div id="signup">
      <div id="signup-box">
        {/* Signup title */}
        <h1>Sign up</h1>
        {/* form tag for username and password text boxes */}
        <form id="signup-form" onSubmit={postSignUp}>
          {/* first name text box */}
          <input
            type="text"
            id="signup-firstname"
            placeholder="first name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {/* last name text box */}
          <input
            type="text"
            id="signup-lastname"
            placeholder="last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {/* username text box */}
          <input
            type="text"
            id="signup-username"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* password text box */}
          <input
            type="password"
            id="signup-password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* button to submit */}
          <button id="signup-submit" type="submit">
            sign up
          </button>
        </form>
      </div>
    </div>
  );
}
