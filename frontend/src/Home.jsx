import Chatroom from './Chatroom.jsx';
import Noteboard from './Noteboard.jsx';
import Donetasks from './Donetasks.jsx';
import GroupTasksApp from './GroupTasks.jsx';

export default function Home() {
  return (
    <div id="home">
      {/* passing in our chatroom component first */}
      <Chatroom />
      {/* passing in our noteboard component next */}
      <Noteboard />
      {/* passing in our donetasks component last */}
      <Donetasks />
    </div>
  );
}
