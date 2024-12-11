import React, { useState, useEffect, useContext } from "react";
import "../styles/Chatwindow.css";
import { sendMessageToChatGPT } from "../services/OpenAiServices";
import { UserContext } from "../context/UserContext"; // Adjust the path

const ChatWindow = () => {
  const { user } = useContext(UserContext); // Access user details from context
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ensure user is available
  if (!user) {
    console.error("User not defined!");
    return <div>Error: User not logged in.</div>;
  }

  const storageKey = `chatHistory_${user.phoneNumber}`; // Use phoneNumber as the unique key

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(storageKey)) || [];
    setMessages(storedMessages);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: user.phoneNumber, text: input };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      try {
        const gptResponse = await sendMessageToChatGPT(input);
        const botMessage = { sender: "Bot", text: gptResponse };
        setMessages([...updatedMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching GPT response:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="chat-window-container">
      <div className="chat-window-header">Welcome {user.phoneNumber}</div>
      <div className="chat-window-messages">
        {messages.map((msg, index) => (
          <p
            key={index}
            className={`chat-message ${
              msg.sender === user.phoneNumber ? "user-message" : "bot-message"
            }`}
          >
            <strong>{msg.sender === user.phoneNumber ? "You" : msg.sender}: </strong>
            {msg.text}
          </p>
        ))}
        {loading && <p className="loading">***</p>}
      </div>
      <div className="chat-window-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat-window-input"
        />
        <button onClick={handleSend} className="chat-window-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
