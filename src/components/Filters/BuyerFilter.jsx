//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./buyerFilter.css";

function BuyerFilter({ activeFilter, setActiveFilter }) {
    const { client } = useMQTT();
    if (!client) return null;

    function handleClick(filterType, filterValue = null) {
        if (['recentes', 'todos', 'pagos'].includes(filterType)) {
            let topicSuffix = 'parcial-bills';
            if (filterType === 'todos') topicSuffix = 'all';
            if (filterType === 'pagos') topicSuffix = 'paids';

            client.publish(`${MQTT_TOPIC}-${topicSuffix}`, '.');
        }

        setActiveFilter({ type: filterType, value: filterValue });
    }

    return (
        <div className="wrapper-filter-buttons">
            <button
                className={`filter-button ${activeFilter.type === 'recentes' ? 'active' : ''}`}
                onClick={() => handleClick('recentes')}
            >Recentes</button>

            <button
                className={`filter-button ${activeFilter.type === 'todos' ? 'active' : ''}`}
                onClick={() => handleClick('todos')}
            >Todos</button>

            <button
                className={`filter-button ${activeFilter.type === 'pagos' ? 'active' : ''}`}
                onClick={() => handleClick('pagos')}
            >Pagos</button>

            <div className="splitter"></div>

            <button
                className={`filter-button ${activeFilter.type === 'bank' && activeFilter.value === 'Nubank' ? 'active' : ''}`}
                onClick={() => handleClick('bank', 'Nubank')}
            >Nubank</button>

            <button
                className={`filter-button ${activeFilter.type === 'bank' && activeFilter.value === 'Santander' ? 'active' : ''}`}
                onClick={() => handleClick('bank', 'Santander')}
            >Santander</button>
        </div>
    )
}

export default BuyerFilter;