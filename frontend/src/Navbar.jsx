import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      {/* our header */}
      <nav id="nav">
        {/* project logo */}
        <img src = '/logo.png' />
        {/* project title */}
        <div id="links">
          {/* our home link */}
          <Link to="/">Home</Link>
          {/* our sign up link */}
          <Link to="/signup">Sign up</Link>
          {/* our login link */}
          <Link to="/login">Login</Link>
        </div>
      </nav>
    </div>
  );
}
