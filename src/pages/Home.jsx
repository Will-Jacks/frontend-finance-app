import { useState } from "react";

//Componentes
import BottomComponent from "../components/BottomComponent/BottomComponent";
import Headers from "../components/Headers/Header";
import RenderBills from "../components/RenderBills/RenderBills";

//Estilização
import "./home.css";
import Estatistics from "../components/Estatistics/Estatistics";

function Home() {

    const [message, setMessage] = useState([]);
    const [editingBill, setEditingBill] = useState(null);

    return (
        <>
            <Headers />
            <RenderBills
                message={message}
                setMessage={setMessage}
                setEditingBill={setEditingBill}
            />
            <Estatistics />
            <BottomComponent
                message={message}
                setMessage={setMessage}
                editingBill={editingBill}
                setEditingBill={setEditingBill}
            />
        </>
    )
}

export default Home;