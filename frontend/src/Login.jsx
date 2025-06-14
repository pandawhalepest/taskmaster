import {Link} from 'react-router-dom'
export default function Login () {
    return (
<div>
    {/* Login title */}
       <h1>Login</h1>
       {/* form tag for username and password text boxes */}
       <form id = 'login'>
        {/* username text box */}
        <input type = 'text' id = 'login-username' placeholder = 'username...' />
        {/* password text box */}
        <input type = 'password' id = 'login-password' placeholder = 'password...' />
        {/* button to submit */}
        <button id = 'login-submit' type = 'submit'>Login</button>
       </form>
       {/* if you have signed up it will link to signup when clicking 'click here' */}
       <p>If you have not signed up <Link to = '/signup'>click here</Link></p>
       </div>
    )
}