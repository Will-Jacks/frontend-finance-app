import { useNavigate } from "react-router-dom";
import Headers from "../components/Headers/Header"
import MonthCard from "../components/MonthCard/MonthCard";
import useMQTT from "../hooks/useMQTT";
import "./Months.css";
import { MQTT_TOPIC } from "../context/MQTTContext";

function Months() {
    const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const { client, setMessage } = useMQTT();
    const navigate = useNavigate();

    function handleMonthChange(monthIndex) {
        const year = new Date().getFullYear();
        const initialDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex + 1, 0);

        const initialDateFilter = initialDate.toISOString().split("T")[0];
        const endDateFilter = endDate.toISOString().split("T")[0];
        setMessage([]);
        client.publish(
            `${MQTT_TOPIC}-somatotal&home`,
            `http://192.168.0.33:8080/bill/bills-by-period?inicio=${initialDateFilter}&fim=${endDateFilter}`
        );
        navigate('/');
    }

    return (
        <div>
            <Headers />
            <div className="months-container">
                {
                    months.map((monthName, index) => (
                        <MonthCard
                            key={monthName}
                            month={monthName}
                            handleClick={() => handleMonthChange(index)}
                        />
                    ))
                }
            </div>
        </div>
    )
}


export default Months