//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./buyerFilter.css";

function BuyerFilter({ message, setMessage }) {
    const { client } = useMQTT();
    if (!client) return null;

    function handleBuyerFilter(buyer) {
        const filteredBills = message.filter(bill => bill.comprador === buyer);
        setMessage(filteredBills);
    }

    function handleBankFilter(bank) {
        const filteredBills = message.filter(bill => bill.banco === bank);
        setMessage(filteredBills);
    }

    function handleBankAndBuyerFilter(bank, buyer) {
        const filteredBills = message.filter(bill => bill.banco === bank && bill.comprador === buyer);
        setMessage(filteredBills);
    }

    return (
        <div className="wrapper-filter-buttons">
            <button onClick={() => client.publish(`${MQTT_TOPIC}-parcial-bills`, '.')}>Recentes</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-all`, '.')}>Todos</button>
            <button onClick={() => client.publish(`${MQTT_TOPIC}-paids`, '.')}>Pagos</button>
            <div className="splitter"></div>
            <button onClick={() => handleBuyerFilter('Lívia')}>Lívia</button>
            <button onClick={() => handleBuyerFilter('William')}>William</button>
            <button onClick={() => handleBuyerFilter('Miriam')}>Miriam</button>
            <button onClick={() => handleBankFilter('Nubank')}>Nubank</button>
            <button onClick={() => handleBankFilter('Santander')}>Santander</button>
            <div className="splitter"></div>
            <button
                onClick={() => handleBankAndBuyerFilter('Santander', 'Lívia')} id="filter-button-santander-livia">Lib</button>
            <button onClick={() => () => handleBankAndBuyerFilter('Santander', 'William')}
                id="filter-button-santander-william">Will</button>
            <div className="splitter"></div>
            <button onClick={() => handleBankAndBuyerFilter('Nubank', 'Lívia')}
                id="filter-button-nubank-livia">Lib</button>
            <button onClick={() => handleBankAndBuyerFilter('Nubank', 'William')}
                id="filter-button-nubank-william">Will</button>
        </div>
    )
}

export default BuyerFilter;