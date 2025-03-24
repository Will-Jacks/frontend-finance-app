import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Banks from "./pages/Banks";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/banks" element={<Banks />} />
      </Routes>
    </Router>
  )
}

export default App
