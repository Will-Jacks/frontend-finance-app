import { useNavigate } from "react-router-dom";
import Headers from "../components/Headers/Header"
import MonthCard from "../components/MonthCard/MonthCard";
import useMQTT from "../hooks/useMQTT";
import "./Months.css";
import { MQTT_TOPIC } from "../context/MQTTContext";

function Months() {
    const month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const { client } = useMQTT();
    const navigate = useNavigate();

    function handleClick() {
        client.publish(`${MQTT_TOPIC}-all`, '.');
        navigate('/');
    }
    return (
        <div>
            <Headers />
            <div className="months-container">
                {
                    month.map(month => (
                        <MonthCard key={month} month={month} handleClick={handleClick} />
                    ))
                }
            </div>
        </div>
    )
}

export default Months