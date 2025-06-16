import Chatroom from './Chatroom.jsx';
import Noteboard from './Noteboard.jsx';
import Donetasks from './Donetasks.jsx';

export default function Home() {
  return (
    <div id="home">
      <div className='background-image'>
        <div className='background-color'>
      {/* passing in our chatroom component first */}
      <Chatroom />
      {/* passing in our noteboard component next */}
      <Noteboard />
      {/* passing in our donetasks component last */}
      <Donetasks />

        </div>
      </div>
    </div>
  );
}
