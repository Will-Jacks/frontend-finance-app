import { useState } from "react";
import { MQTT_TOPIC } from "../../context/MQTTContext";
import useMQTT from "../../hooks/useMQTT";

function DateFilter({ endpoint }) {
    const { client } = useMQTT();
    const [initialDateFilter, setInitialDateFilter] = useState();
    const [endDateFilter, setEndDateFilter] = useState();

    function handleDate(e) {
        e.preventDefault();
        if (endpoint === "somatotal") {
            client.publish(`${MQTT_TOPIC}-get-somatotal&home`, `http://192.168.0.33:8080/conta/get/somatotal/periodo?inicio=${initialDateFilter}&fim=${endDateFilter}`);

        }
        if (endpoint === "home") {
            client.publish(`${MQTT_TOPIC}-get-somatotal&home`, `http://192.168.0.33:8080/conta/get/home/periodo?inicio=${initialDateFilter}&fim=${endDateFilter}`);
        }
    }

    return (
        <form onSubmit={handleDate} className="search-itens">
            <h3>Pesquisar por período</h3>
            <label htmlFor="">Data inicial</label>
            <input type="date" name="" id="" onChange={e => setInitialDateFilter(e.target.value)} />
            <label htmlFor="">Data final</label>
            <input type="date" onChange={e => setEndDateFilter(e.target.value)} />
            <button type="submit">Pesquisar</button>
        </form>
    );
}

export default DateFilter;