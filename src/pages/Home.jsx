//Componentes
import BottomComponent from "../components/BottomComponent/BottomComponent";
import Headers from "../components/Headers/Header";
import RenderBills from "../components/RenderBills/RenderBills";

//Estilização
import "./home.css";

function Home() {

    return (
        <>
            <Headers />
            <RenderBills />
            <BottomComponent />
        </>
    )
}

export default Home;