import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import GeneralBills from "./pages/GeneralBills";



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generalBills" element={<GeneralBills />} />
      </Routes>
    </Router>
  )
}

export default App
