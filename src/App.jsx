import { useEffect } from 'react';
//Route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//Componentes
import Home from "./pages/Home";
import GeneralBills from "./pages/GeneralBills";
//Utils
import { MQTTProvider } from "./context/MQTTContext";
import isTheFirstTime from "./utils/getUsername";
//Estilização
import { ToastContainer } from "react-toastify";
import Months from './pages/Months';

function App() {

  useEffect(() => {
    isTheFirstTime();
  }, [])
  return (
    <MQTTProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generalBills" element={<GeneralBills />} />
          <Route path='/months' element={<Months />} />
        </Routes>
      </Router>
    </MQTTProvider>
  )
}

export default App
