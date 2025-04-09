import BankCard from "../components/BankCard/BankCard";
import Headers from "../components/Headers/Header";

import { useEffect, useState } from "react";
import { client, topic } from "../connection";

import { useNavigate } from 'react-router-dom';

import "./generalBills.css"

function GeneralBills() {
    const navigate = useNavigate();

    const [message, setMessage] = useState({});

    useEffect(() => {
        function handleMessage(currentTopic, payload) {
            if (currentTopic == `${topic}-generalBills`) {
                const groupedData = groupByBank(JSON.parse(payload.toString()));
                console.log(groupedData);
                console.log("Chegou até aqui");
                setMessage(groupedData);
            }
        }
        console.log("useEffect!")
        client.subscribe(`${topic}-generalBills`);
        client.publish(`${topic}-generalBills-getData`, '.'); // Dispara o método GET no backend MQTT

        client.on('message', handleMessage);

        return () => {
            client.off('message', handleMessage)
            client.unsubscribe(topic);
            //Fecha a conexão com o tópico para deixar de consumir bandwidth
        }
    }, []);

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

    return (
        <div className="general-bills-container">
            <Headers />
            <button className="back-button" onClick={()=> navigate("/")}>⬅ Início</button>
            {Object.entries(message).map(([banco, compradores]) => (
                <BankCard key={banco} banco={banco} compradores={compradores} />
            ))}
        </div>
    );
}

export default GeneralBills;