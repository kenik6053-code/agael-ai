export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-6">

      <div className="max-w-md">

        <div className="flex items-center gap-3 mb-2">

          <div className="bg-violet-600 p-2 rounded-full">
          
          </div>

          <span className="font-semibold text-white">
            Agael AI
          </span>

        </div>

        <div className="bg-slate-800 rounded-2xl px-6 py-5 shadow-xl">

          <div className="flex gap-2">

            <span className="w-3 h-3 bg-violet-500 rounded-full animate-bounce"></span>

            <span
              className="w-3 h-3 bg-violet-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>

            <span
              className="w-3 h-3 bg-violet-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></span>

          </div>

          <p className="text-slate-400 mt-3 text-sm">
            Agael AI is thinking...
          </p>

        </div>

      </div>

    </div>
  );
}