import Tasks from './Tasks.jsx';
export default function Noteboard({ onTaskDone, groupTasks }) {
  return (
    <div id='board'>
      {/* pass in our imported component */}
      <Tasks onTaskDone={onTaskDone} groupTasks={groupTasks} />
    </div>
  );
}
