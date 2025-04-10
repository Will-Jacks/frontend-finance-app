import { useState } from "react";

//Componentes
import BottomComponent from "../components/BottomComponent/BottomComponent";
import Headers from "../components/Headers/Header";
import RenderBills from "../components/RenderBills/RenderBills";

//Libs
import { useNavigate } from 'react-router-dom';

//Estilização
import "./home.css";

function Home() {
    const navigate = useNavigate();
    const [message, setMessage] = useState([]);

    return (
        <>
            <Headers />
            <RenderBills
                message={message}
                setMessage={setMessage} />
            {/* Floating Action Button */}
            <button className="fab" onClick={() => navigate("/generalBills")}>
                📊
            </button>
            <BottomComponent
                message={message}
                setMessage={setMessage}
            />
        </>
    )
}

export default Home;