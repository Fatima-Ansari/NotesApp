import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ContextProvider from "./context/ContextProvider"; 
import NoteModal from "./components/NoteModal";
import {ToastContainer} from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notemodel" element={<NoteModal />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ContextProvider>
      <ToastContainer/>
    </BrowserRouter>
  );
}

