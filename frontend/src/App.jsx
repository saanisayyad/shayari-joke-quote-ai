import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./components/Home";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-hidden bg-[#0c0b0d] text-stone-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
