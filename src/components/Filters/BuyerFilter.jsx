//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./buyerFilter.css";

function BuyerFilter() {
    const { client } = useMQTT();
    if (!client) return null;
    return (
        <div className="wrapper-filter-buttons">
            <button onClick={() => client.publish(`${MQTT_TOPIC}-parcial-bills`, '.')}>Recentes</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-all`, '.')}>Todos</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-paids`, '.')}>Pagos</button>
            {/* <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador`, 'livia')}>Lívia</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador`, 'william')}>William</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador`, 'miriam')}>Miriam</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-banco`, 'nubank')}>Nubank</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-banco`, 'santander')}>Santander</button>
 */}
            {/* <button
                onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador-banco`, '{"comprador": "livia","banco":"santander"}')} id="filter-button-santander-livia">Lib</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador-banco`, '{"comprador": "william","banco":"santander"}')}
                id="filter-button-santander-william">Will</button>
            <div className="splitter"></div>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador-banco`, '{"comprador": "livia","banco":"nubank"}')}
                id="filter-button-nubank-livia">Lib</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-filtro-comprador-banco`, '{"comprador": "william","banco":"nubank"}')}
                id="filter-button-nubank-william">Will</button> */}
        </div>
    )
}

export default BuyerFilter;