import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  // store username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // async function to send post request to backend to verify login
  async function postLogin(e) {
    // prevent browser refresh when submitting login
    e.preventDefault();
    // try catch block
    try {
      // send post request with post method, content-type headers, and body stringifying out username and password
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      // if response fails send error
      if (!response.ok) {
        throw new Error('response failed');
      }
      // store our requested data in data variable
      const data = await response.json();
      console.log(data);

      // set username and password inputs to an empty string once user logs in
      setUsername('');
      setPassword('');
    } catch (error) {
      // log our thrown error if response fails
      console.log(error);
    }
  }

  return (
    <div id="login">
      <div id="login-box">
        {/* Login title */}
        <h1>Login</h1>
        {/* form tag for username and password text boxes */}
        <form id="login-form" onSubmit={postLogin}>
          {/* username text box */}
          <input
            type="text"
            id="login-username"
            placeholder="username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* password text box */}
          <input
            type="password"
            id="login-password"
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* button to submit */}
          <button id="login-submit" type="submit">
            Login
          </button>
        </form>
        {/* if you have signed up it will link to signup when clicking 'click here' */}
        <p>
          If you have not signed up <Link to="/signup">click here</Link>
        </p>
      </div>
    </div>
  );
}
