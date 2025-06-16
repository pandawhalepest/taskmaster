import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
export default function Login() {
  // store username and password inputs that was saved in database
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //store errors when logging in
  const [loginError, setLoginError] = useState('')
const navigate = useNavigate()
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
      // if response fails assign firstName to incorrect... then throw error
      if (!response.ok) {
        //set login error to the error
        setLoginError('Incorrect username/password');
        throw new Error('response failed');
      }
      // store our requested data in data variable
      const data = await response.json();
      console.log(data);

      // set username and password inputs to an empty string once user logs in
      setUsername('');
      setPassword('');
     navigate('/')
    } catch (error) {
      // log our thrown error if response fails
      console.log(error);
    }
  }

  return (
    <div id="login">
      <h1>{loginError}</h1>
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
