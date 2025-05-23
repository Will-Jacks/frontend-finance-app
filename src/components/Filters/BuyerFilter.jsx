//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./buyerFilter.css";
import { useState } from "react";

function BuyerFilter({ message, setBillRendered }) {
    const { client } = useMQTT();
    const [activeButton, setActiveButton] = useState('recentes');
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

    function handleClick(id, action) {
        setActiveButton(id);
        action();
    }

    return (
        <div className="wrapper-filter-buttons">
            <button
                className={`filter-button ${activeButton === 'recentes' ? 'active' : ''}`}
                onClick={() => handleClick('recentes', () => client.publish(`${MQTT_TOPIC}-parcial-bills`, '.'))}
            >Recentes</button>

            <button
                className={`filter-button ${activeButton === 'todos' ? 'active' : ''}`}
                onClick={() => handleClick('todos', () => client.publish(`${MQTT_TOPIC}-all`, '.'))}
            >Todos</button>

            <button
                className={`filter-button ${activeButton === 'pagos' ? 'active' : ''}`}
                onClick={() => handleClick('pagos', () => client.publish(`${MQTT_TOPIC}-paids`, '.'))}
            >Pagos</button>

            <div className="splitter"></div>

            <button
                className={`filter-button ${activeButton === 'livia' ? 'active' : ''}`}
                onClick={() => handleClick('livia', () => {
                    const filtered = message.filter(bill => bill.comprador === 'Lívia');
                    setBillRendered(filtered);
                })}
            >Lívia</button>

            <button
                className={`filter-button ${activeButton === 'william' ? 'active' : ''}`}
                onClick={() => handleClick('william', () => {
                    const filtered = message.filter(bill => bill.comprador === 'William');
                    setBillRendered(filtered);
                })}
            >William</button>

            <button
                className={`filter-button ${activeButton === 'miriam' ? 'active' : ''}`}
                onClick={() => handleClick('miriam', () => {
                    const filtered = message.filter(bill => bill.comprador === 'Miriam');
                    setBillRendered(filtered);
                })}
            >Miriam</button>

            <button
                className={`filter-button ${activeButton === 'nubank' ? 'active' : ''}`}
                onClick={() => handleClick('nubank', () => {
                    const filtered = message.filter(bill => bill.banco === 'Nubank');
                    setBillRendered(filtered);
                })}
            >Nubank</button>

            <button
                className={`filter-button ${activeButton === 'santander' ? 'active' : ''}`}
                onClick={() => handleClick('santander', () => {
                    const filtered = message.filter(bill => bill.banco === 'Santander');
                    setBillRendered(filtered);
                })}
            >Santander</button>

            <div className="splitter"></div>

            <button
                id="filter-button-santander-livia"
                className={`filter-button ${activeButton === 'santander-livia' ? 'active' : ''}`}
                onClick={() => handleClick('santander-livia', () => {
                    const filtered = message.filter(bill => bill.banco === 'Santander' && bill.comprador === 'Lívia');
                    setBillRendered(filtered);
                })}
            >Lib</button>

            <button
                id="filter-button-santander-william"
                className={`filter-button ${activeButton === 'santander-william' ? 'active' : ''}`}
                onClick={() => handleClick('santander-william', () => {
                    const filtered = message.filter(bill => bill.banco === 'Santander' && bill.comprador === 'William');
                    setBillRendered(filtered);
                })}
            >Will</button>

            <div className="splitter"></div>

            <button
                id="filter-button-nubank-livia"
                className={`filter-button ${activeButton === 'nubank-livia' ? 'active' : ''}`}
                onClick={() => handleClick('nubank-livia', () => {
                    const filtered = message.filter(bill => bill.banco === 'Nubank' && bill.comprador === 'Lívia');
                    setBillRendered(filtered);
                })}
            >Lib</button>

            <button
                id="filter-button-nubank-william"
                className={`filter-button ${activeButton === 'nubank-william' ? 'active' : ''}`}
                onClick={() => handleClick('nubank-william', () => {
                    const filtered = message.filter(bill => bill.banco === 'Nubank' && bill.comprador === 'William');
                    setBillRendered(filtered);
                })}
            >Will</button>
        </div>
    )
}

export default BuyerFilter;