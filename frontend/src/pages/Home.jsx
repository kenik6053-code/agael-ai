import { useNavigate } from "react-router-dom";
import { FaRobot, FaFilePdf, FaImage, FaMicrophone } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">

      <h1 className="text-6xl font-extrabold text-violet-500 mb-4">
        Agael AI
      </h1>

      <p className="text-slate-300 text-xl mb-10 text-center max-w-2xl">
        Your Intelligent AI Assistant for Learning, Productivity,
        Agriculture and Creativity.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

        <div className="bg-slate-900 rounded-2xl p-6 text-center">
          <FaRobot className="text-4xl text-violet-500 mx-auto mb-3" />
          <p>AI Chat</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-center">
          <FaFilePdf className="text-4xl text-red-500 mx-auto mb-3" />
          <p>PDF AI</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-center">
          <FaImage className="text-4xl text-green-500 mx-auto mb-3" />
          <p>Vision AI</p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 text-center">
          <FaMicrophone className="text-4xl text-blue-500 mx-auto mb-3" />
          <p>Voice AI</p>
        </div>

      </div>

      <button
        onClick={() => navigate("/chat")}
        className="bg-violet-600 hover:bg-violet-700 px-10 py-4 rounded-xl text-xl font-bold transition"
      >
        Start Chatting →
      </button>

    </div>
  );
}