import React, { useState, useEffect, useContext } from "react";
import "../styles/ChatStyles.css"; // Apply the shared styles
import { UserContext } from "../context/UserContext"; // Import UserContext

const ChatHistory = () => {
  const { user } = useContext(UserContext); // Access user details from context
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    if (user && user.phoneNumber) {
      const storageKey = `chatHistory_${user.phoneNumber}`;
      const history = JSON.parse(localStorage.getItem(storageKey)) || [];
      setChatHistory(history);
    }
  }, [user]);

  if (!user) {
    return <div>Error: User not logged in.</div>;
  }

  return (
    <div className="chat-window-container">
      {/* Header Section */}
      <div className="chat-window-header">
        Welcome, {user.phoneNumber || "User"}'s Chat History
      </div>

      {/* Messages Section */}
      <div className="chat-window-messages">
        {chatHistory.length > 0 ? (
          chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.sender === user.phoneNumber ? "user-message" : "bot-message"
              }`}
            >
              <strong>
                {msg.sender === user.phoneNumber ? "You" : msg.sender}:
              </strong>{" "}
              {msg.text}
            </div>
          ))
        ) : (
          <p>No chat history available. Start a conversation to save history!</p>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;
