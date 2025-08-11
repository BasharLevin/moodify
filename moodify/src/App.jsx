import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
function Home() { return <h1 style={{padding:24}}>Home OK ✅</h1>; }
function Callback() { return <p style={{padding:24}}>Callback OK ✅</p>; }

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/callback" element={<Callback/>} />
      </Routes>
    </BrowserRouter>
  );
}
