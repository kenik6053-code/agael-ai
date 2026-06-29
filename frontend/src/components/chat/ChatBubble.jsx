import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FaRobot,
  FaUser,
  FaCopy,
  FaCheck,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";

export default function ChatBubble({ sender, message }) {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const isUser = sender === "user";

  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    if (isUser) {
      setDisplayedText(message);
      return;
    }

    let index = 0;

    setDisplayedText("");

    const interval = setInterval(() => {
      index++;

      setDisplayedText(message.slice(0, index));

      if (index >= message.length) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);

  }, [message, isUser]);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>

      <div className="max-w-4xl">

        {/* Header */}
        <div
          className={`flex items-center gap-3 mb-2 ${
            isUser ? "justify-end" : ""
          }`}
        >
          {!isUser && (
            <>
              <div className="bg-violet-600 p-2 rounded-full">
                <FaRobot className="text-white" />
              </div>

              <span className="font-semibold text-white">
                Agael AI
              </span>
            </>
          )}

          {isUser && (
            <>
              <span className="font-semibold text-white">
                You
              </span>

              <div className="bg-sky-600 p-2 rounded-full">
                <FaUser className="text-white" />
              </div>
            </>
          )}

          <span className="text-xs text-slate-400">
            {time}
          </span>
        </div>

        {/* Message */}
        <div
          className={`rounded-2xl px-6 py-4 shadow-xl ${
            isUser
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-100"
          }`}
        >
          <ReactMarkdown
            components={{
              code({ inline, children }) {
                if (inline) {
                  return (
                    <code className="bg-slate-900 px-2 py-1 rounded">
                      {children}
                    </code>
                  );
                }

                return (
                  <SyntaxHighlighter
                    language="python"
                    style={oneDark}
                    customStyle={{
                      borderRadius: "12px",
                    }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {displayedText}
          </ReactMarkdown>
        </div>

        {/* Actions */}
        {!isUser && (
          <div className="flex items-center gap-4 mt-3 text-slate-400">

            <CopyToClipboard
              text={message}
              onCopy={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <button className="hover:text-white transition flex items-center gap-2">
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied" : "Copy"}
              </button>
            </CopyToClipboard>

            <button className="hover:text-green-400">
              <FaThumbsUp />
            </button>

            <button className="hover:text-red-400">
              <FaThumbsDown />
            </button>

          </div>
        )}

      </div>

    </div>
  );
}