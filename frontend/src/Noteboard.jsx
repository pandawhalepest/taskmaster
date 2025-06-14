import Tasks from './Tasks.jsx';
export default function Noteboard() {
  return (
    <div id="board">
        {/* pass in our imported component */}
      <Tasks />
    </div>
  );
}
