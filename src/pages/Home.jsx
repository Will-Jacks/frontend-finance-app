import BottomComponent from "../components/BottomComponent/BottomComponent";
import Headers from "../components/Headers/Header";
import RenderBills from "../components/RenderBills/RenderBills";

import { useNavigate } from 'react-router-dom';

import "./home.css";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Headers />
            <RenderBills />
            {/* Floating Action Button */}
            <button className="fab" onClick={() => navigate("/generalBills")}>
                📊
            </button>
            <BottomComponent />
        </>
    )
}

export default Home;