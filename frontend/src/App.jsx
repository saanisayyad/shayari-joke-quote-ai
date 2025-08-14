import { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import Joke from "./components/Joke";
import Shayari from "./components/Shayari";
import Quote from "./components/Quote";
import './index.css'
import Home from "./components/Home";

export default function App() {
  const [message, setMessage] = useState('');

const displayMessage = () => {
  setMessage("Copied to clipboard!");
  setTimeout(() => {
    setMessage('');
  }, 2000);
};

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center">
        {message && (
          <div className="absolute top-4 text-white/70 animate-slideDown z-20">
            {message}
          </div>
        )}
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/joke" element={<Joke showMessage={displayMessage} />} />
          <Route path="/shayari" element={<Shayari showMessage={displayMessage} />} />
          <Route path="/quote" element={<Quote showMessage={displayMessage} />} />
        </Routes>

    </div>
  );
}
