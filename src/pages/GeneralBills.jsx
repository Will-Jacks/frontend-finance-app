import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

//Urls MQTT
import useMQTT from "../hooks/useMQTT";
import { MQTT_TOPIC } from "../context/MQTTContext";

//Componentes
import BankCard from "../components/BankCard/BankCard";
import Headers from "../components/Headers/Header";

//Estilização
import "./generalBills.css";
import "./searcher.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function GeneralBills() {
    const [initialDateFilter, setInitialDateFilter] = useState();
    const [endDateFilter, setEndDateFilter] = useState();

    const [message, setMessage] = useState({});
    const navigate = useNavigate();
    const { client } = useMQTT();

    useEffect(() => {
        if (!client) return;

        function handleMessage(currentTopic, payload) {
            if (currentTopic === `${MQTT_TOPIC}-generalBills`) {
                const groupedData = groupByBank(JSON.parse(payload.toString()));
                setMessage(groupedData);
            }
        }
        client.subscribe(`${MQTT_TOPIC}-generalBills`);
        client.publish(`${MQTT_TOPIC}-generalBills-getData`, '.'); // Dispara o método GET no backend MQTT
        client.on('message', handleMessage);

        return () => {
            client.off('message', handleMessage)
            client.unsubscribe(`${MQTT_TOPIC}-generalBills`);
            //Fecha a conexão com o tópico para deixar de consumir bandwidth
        }
    }, [client]);

    function groupByBank(data) {
        return data.reduce((acc, { comprador, banco, valor }) => {
            if (!acc[banco]) {
                acc[banco] = {};
            }
            if (!acc[banco][comprador]) {
                acc[banco][comprador] = 0;
            }
            acc[banco][comprador] += valor;
            return acc;
        }, {});
    };

    function handleDate(e) {
        e.preventDefault();
        client.publish(`${MQTT_TOPIC}-conta/get/somatotal/periodo`, `http://192.168.0.33:8080/conta/get/somatotal/periodo?inicio=${initialDateFilter}&fim=${endDateFilter}`);
    }

    return (
        <div className="general-bills-container">
            <Headers />
            <button className="back-button" onClick={() => navigate("/")}><FontAwesomeIcon icon={faHouse} /> Início</button>
            <form onSubmit={handleDate} className="search-itens">
                <h3>Pesquisar por período</h3>
                <label htmlFor="">Data inicial</label>
                <input type="date" name="" id="" onChange={e => setInitialDateFilter(e.target.value)} />
                <label htmlFor="">Data final</label>
                <input type="date" onChange={e => setEndDateFilter(e.target.value)} />
                <button type="submit">Pesquisar</button>
            </form>
            <div>
                <h2 style={{ textAlign: "justify" }}>Olá, {localStorage.getItem('username')}! Veja um resumo das suas contas</h2>
            </div>
            {Object.entries(message).map(([banco, compradores]) => (
                <BankCard key={banco} banco={banco} compradores={compradores} />
            ))}
        </div>
    );
}

export default GeneralBills;