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
import NavBar from './components/NavBar/NavBar';
import UsersInfo from './pages/UsersInfo';
function App() {

  useEffect(() => {
    isTheFirstTime();
  }, [])
  return (
    <MQTTProvider>
      <Router>
        <div style={{ paddingBottom: "60px" }}>
          <ToastContainer />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generalBills" element={<GeneralBills />} />
            <Route path='/months' element={<Months />} />
            <Route path='/user' element={<UsersInfo />} />
          </Routes>
        </div>
      </Router>
    </MQTTProvider>
  )
}

export default App
