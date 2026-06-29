import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Chat from "./components/chat/Chat";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>

      <div className="flex flex-col h-screen bg-slate-950 text-white">

        <Navbar />

        <main className="flex-1 overflow-hidden">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/chat"
              element={<Chat />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;