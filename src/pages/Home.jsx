import BottomComponent from "../components/BottomComponent/BottomComponent";
import Headers from "../components/Headers/Header";
import RenderBills from "../components/RenderBills/RenderBills";

export default function Home () {

    return(
        <>
            <Headers />
            <RenderBills />
            <BottomComponent />
        </>
    )
}