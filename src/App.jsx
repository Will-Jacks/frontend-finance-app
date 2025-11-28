//Route
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
//Componentes
import Home from "./pages/Home";
import GeneralBills from "./pages/GeneralBills";
//Utils
import { MQTTProvider } from "./context/MQTTContext";
//Estilização
import { ToastContainer } from "react-toastify";
import Months from './pages/Months';
import NavBar from './components/NavBar/NavBar';
import UsersInfo from './pages/UsersInfo';

function App() {

  return (
    <MQTTProvider>
      <Router>
        <div style={{ paddingBottom: "60px" }}>
          <ToastContainer />
          <NavBar />
          <Routes>
            <Route path="/" element={<GeneralBills />} />
            <Route path="/generalBills" element={<Home />} />
            <Route path='/months' element={<Months />} />
            <Route path='/user' element={<UsersInfo />} />
          </Routes>
        </div>
      </Router>
    </MQTTProvider>
  )
}

export default App
