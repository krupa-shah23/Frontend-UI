import { useState } from "react";
import "./messages.css";

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  if (conversations.length === 0) {
    return (
      <div className="empty-messages">
        <h2>Your messages</h2>
        <p>Send private photos and messages to a friend.</p>
        <button
          onClick={() => {
            const newChat = { id: 1, name: "demo_user", messages: [] };
            setConversations([newChat]);
            setActiveChat(newChat);
          }}
        >
          Send Message
        </button>
      </div>
    );
  }

  // SEND MESSAGE
  function sendMessage() {
    if (!message.trim()) return;

    setConversations((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );

    setActiveChat((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));

    setMessage("");
  }

  return (
    <div className="messages-page">
      <div className="chat-container">
        {/* LEFT CHAT LIST */}
        <div className="chat-list">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                activeChat?.id === chat.id ? "active" : ""
              }`}
              onClick={() => setActiveChat(chat)}
            >
              {chat.name}
            </div>
          ))}
        </div>

        {/* CHAT WINDOW */}
        {activeChat && (
          <div className="chat-window">
            <div className="chat-header">{activeChat.name}</div>

            <div className="chat-messages">
              {activeChat.messages.length === 0 ? (
                <p style={{ color: "#888" }}>
                  Start a conversation with {activeChat.name}
                </p>
              ) : (
                activeChat.messages.map((msg, index) => (
                  <div key={index} className="message">
                    {msg}
                  </div>
                ))
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
