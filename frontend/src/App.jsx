import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      {/* passing in navbar */}
      <Navbar />
      {/* our routes */}
      <Routes>
        {/* home route */}
        <Route path="/" element={<Home />} />
        {/* login route */}
        <Route path="/login" element={<Login />} />
        {/* signup route */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}



