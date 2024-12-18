import React, { useState, useEffect, useContext } from "react";
import "../styles/ChatStyles.css";
import { sendMessageToChatGPT } from "../services/OpenAiServices";
import { UserContext } from "../context/UserContext";

const ChatWindow = () => {
  const { user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    console.error("User not defined!");
    return <div className="error-message">Error: User not logged in.</div>;
  }

  const storageKey = `chatHistory_${user.phoneNumber}`;

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(storageKey)) || [];
    setMessages(storedMessages);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { sender: user.phoneNumber, text: trimmedInput };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const gptResponse = await sendMessageToChatGPT(trimmedInput);
      const botMessage = { sender: "Tee.Ai", text: gptResponse };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching GPT response:", error);
      const errorMessage = { sender: "Tee.Ai", text: "Sorry, I couldn't process that." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-window-container">
      {/* Header Section */}
      <div className="chat-window-header">
        Hey there  {user.phoneNumber || "User"}
      </div>

      {/* Messages Section */}
      <div className="chat-window-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === user.phoneNumber ? "user-message" : "bot-message"
            }`}
          >
            <strong>{msg.sender === user.phoneNumber ? "You" : msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
        {loading && <div className="loading">Bot is typing...</div>}
      </div>

      {/* Input Section */}
      <div className="chat-window-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="chat-window-input"
        />
        <button onClick={handleSend} className="chat-window-button" disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
