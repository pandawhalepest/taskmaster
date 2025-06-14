export default function Signup () {
    return (
<div>
    {/* Signup title */}
       <h1>Sign up</h1>
       {/* form tag for username and password text boxes */}
       <form id = 'signup'>
        {/* username text box */}
        <input type = 'text' id = 'signup-firstname' placeholder = 'first name...' />
        <input type = 'text' id = 'signup-lastname' placeholder = 'last name...' />
        <input type = 'text' id = 'signup-username' placeholder = 'username...' />
        {/* password text box */}
        <input type = 'password' id = 'signup-password' placeholder = 'password...' />
        {/* button to submit */}
        <button id = 'signup-submit' type = 'submit'>sign up</button>
       </form>

       </div>
    )
}