import { useRef, useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaPaperclip,
  FaImage,
  FaMicrophone,
} from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const fileInput = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  function send() {
    if (!text.trim() && !file) return;

    onSend(text, file);

    setText("");
    setFile(null);
    resetTranscript();

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }

  function handleVoice() {
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: false,
        language: "en-US",
      });
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-4">

      {file && (
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-slate-800 p-3 text-sm text-slate-300">
          <FaImage className="text-violet-400" />
          <span>{file.name}</span>
        </div>
      )}

      <div className="flex items-center gap-3">

        <input
          ref={fileInput}
          type="file"
          hidden
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={(e) => {
            if (e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />

        <button
          onClick={() => fileInput.current.click()}
          className="rounded-xl bg-slate-800 p-4 text-slate-300 hover:bg-slate-700"
        >
          <FaPaperclip />
        </button>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send();
            }
          }}
          placeholder="Message Agael AI..."
          className="flex-1 rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <button
          onClick={handleVoice}
          className={`rounded-xl p-4 text-white ${
            listening
              ? "bg-red-600 animate-pulse"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          <FaMicrophone />
        </button>

        <button
          onClick={send}
          className="rounded-xl bg-violet-600 p-4 text-white hover:bg-violet-700"
        >
          <FaPaperPlane />
        </button>

      </div>

    </div>
  );
}