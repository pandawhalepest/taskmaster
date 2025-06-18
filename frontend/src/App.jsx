import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import GroupTasksApp from './GroupTasks';

export default function App() {
  return (
    <div>
      <GroupTasksApp />
      {/* passing in imported navbar component */}
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



