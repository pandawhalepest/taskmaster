export default function Chatroom() {
  return (
    <div id="chatroom">
      <div id="messages">
        <p>hello</p>
      </div>
      {/* sending a message area */}
      <form id="send-message">
        {/* text box to write a message */}
        <textarea
          id="message-input"
          placeholder="send a message..."
        />
        {/* send message button */}
        <button id="message-submit">Send</button>
      </form>
    </div>
  );
}
