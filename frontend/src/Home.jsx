import Chatroom from './Chatroom.jsx'
import Noteboard from './Noteboard.jsx'
export default function Home () {

    return (
<div id = 'home'>
    {/* passing in our chatroom component first */}
    <Chatroom />
    {/* passing in our noteboard component next */}
    <Noteboard />
</div>
    )
}