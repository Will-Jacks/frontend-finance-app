//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./buyerFilter.css";
import { useState } from "react";

function BuyerFilter({ message, setBillRendered }) {
    const { client } = useMQTT();
    const [isActive, setIsActive] = useState(false);
    if (!client) return null;

    function handleBuyerFilter(buyer) {
        const filteredBills = message.filter(bill => bill.comprador === buyer);
        setBillRendered(filteredBills);
    }

    function handleBankFilter(bank) {
        const filteredBills = message.filter(bill => bill.banco === bank);
        setBillRendered(filteredBills);
    }

    function handleBankAndBuyerFilter(bank, buyer) {
        const filteredBills = message.filter(bill => bill.banco === bank && bill.comprador === buyer);
        console.log(filteredBills);
        setBillRendered(filteredBills);
    }

    return (
        <div className="wrapper-filter-buttons">
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => client.publish(`${MQTT_TOPIC}-parcial-bills`, '.')}>Recentes</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => client.publish(`${MQTT_TOPIC}-all`, '.')}>Todos</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => client.publish(`${MQTT_TOPIC}-paids`, '.')}>Pagos</button>
            <div className="splitter"></div>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBuyerFilter('Lívia')}>Lívia</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBuyerFilter('William')}>William</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBuyerFilter('Miriam')}>Miriam</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBankFilter('Nubank')}>Nubank</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBankFilter('Santander')}>Santander</button>
            <div className="splitter"></div>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBankAndBuyerFilter('Santander', 'Lívia')} id="filter-button-santander-livia" >Lib</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBankAndBuyerFilter('Santander', 'William')} id="filter-button-santander-william">Will</button>
            <div className="splitter"></div>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBankAndBuyerFilter('Nubank', 'Lívia')} id="filter-button-nubank-livia">Lib</button>
            <button className={`filter-button ${isActive ? 'active' : ''}`} onClick={() => handleBankAndBuyerFilter('Nubank', 'William')} id="filter-button-nubank-william">Will</button>
        </div>
    )
}

export default BuyerFilter;