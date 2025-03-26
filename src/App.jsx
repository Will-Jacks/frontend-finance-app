import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import BankInfo from "./pages/BankInfo";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/banks" element={<BankInfo />} />
      </Routes>
    </Router>
  )
}

export default App
