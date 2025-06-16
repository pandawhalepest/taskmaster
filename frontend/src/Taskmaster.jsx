import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// import '/css/main.css';
import '/css/Chatroom.css';
import '/css/Noteboard.css';
import '/css/Navbar.css';
import '/css/Donetasks.css';
import '/css/Home.css';
import '/css/Signup.css';
import '/css/Login.css';
import '/css/Tasks.css';
import '/css/App.css';

createRoot(document.getElementById('root')).render(
  // adds additional checks
  <StrictMode>
    {/* enables routing in app */}
    <BrowserRouter>
      {/* pass in app component */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
