import { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import {
  sendMessage,
  uploadFile,
  getConversations,
  getMessages,
} from "../../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      message: "Hello Weldone 👋 Welcome to Agael AI!",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function openConversation(id) {
    try {
      const data = await getMessages(id);

      setConversationId(id);

      setMessages(
        data.map((msg) => ({
          sender: msg.sender,
          message: msg.message,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }

  function newChat() {
    setConversationId(null);

    setMessages([
      {
        sender: "ai",
        message: "Hello Weldone 👋 Welcome to Agael AI!",
      },
    ]);
  }

  async function handleSend(text, file) {
    if (!text.trim() && !file) return;

    if (text.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "user",
          message: text,
        },
      ]);
    }

    setLoading(true);

    try {
      if (file) {
        const uploaded = await uploadFile(file);

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: `File uploaded successfully.\n\n${uploaded.filename}`,
          },
        ]);
      }

      if (text.trim()) {
        const response = await sendMessage(text, conversationId);

        if (!conversationId && response.conversation_id) {
          setConversationId(response.conversation_id);
          loadConversations();
        }

        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            message: response.reply,
          },
        ]);
      }
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Failed to connect to the backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full">
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

        <div className="p-4">
          <button
            onClick={newChat}
            className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 py-3 font-semibold text-white"
          >
            + New Chat
          </button>
        </div>

        <div className="px-4 pb-2 text-xs uppercase text-slate-500">
          Recent Chats
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-slate-500 text-sm px-2">
              No conversations yet.
            </p>
          ) : (
            conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => openConversation(chat.id)}
                className={`w-full rounded-lg p-3 text-left transition ${
                  conversationId === chat.id
                    ? "bg-violet-700 text-white"
                    : "hover:bg-slate-800 text-slate-300"
                }`}
              >
                {chat.title}
              </button>
            ))
          )}
        </div>

      </aside>

      <div className="flex flex-1 flex-col bg-slate-950">

        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              sender={msg.sender}
              message={msg.message}
            />
          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef}></div>

        </div>

        <ChatInput onSend={handleSend} />

      </div>
    </div>
  );
}