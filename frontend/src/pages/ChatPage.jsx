import { useState } from "react";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm Agael AI. Ask me anything."
    }
  ]);

  async function sendMessage() {
  if (message.trim() === "") return;

  const updatedMessages = [
    ...messages,
    {
      sender: "user",
      text: message,
    },
  ];

  setMessages(updatedMessages);

  try {
    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    const data = await response.json();

    setMessages([
      ...updatedMessages,
      {
        sender: "ai",
        text: data.reply,
      },
    ]);

    setMessage("");
  } catch (error) {
    console.error(error);

    setMessages([
      ...updatedMessages,
      {
        sender: "ai",
        text: "❌ Could not connect to the backend.",
      },
    ]);
  }
}

  return (
    <div className="chat-page">

      <h1>🤖 Agael AI</h1>

      <div className="chat-window">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sender === "user" ? "user-message" : "ai-message"}
          >
            {msg.text}
          </div>
        ))}

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask Agael AI anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatPage;