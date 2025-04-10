import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import GeneralBills from "./pages/GeneralBills";
import React from 'react';
import { ToastContainer } from "react-toastify";
import { MQTTProvider } from "./context/MQTTContext";

function App() {
  return (
    <MQTTProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generalBills" element={<GeneralBills />} />
        </Routes>
      </Router>
    </MQTTProvider>
  )
}

export default App
