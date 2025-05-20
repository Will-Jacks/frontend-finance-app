import { useNavigate } from "react-router-dom";

function Estatistics() {
    const navigate = useNavigate();
    return (
        <button className="fab" onClick={() => navigate("/generalBills")}>
            📊
        </button>
    )
}

export default Estatistics