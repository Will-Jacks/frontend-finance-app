import { useEffect, useState } from "react";

//Urls MQTT
import useMQTT from "../hooks/useMQTT";
import { MQTT_TOPIC } from "../context/MQTTContext";

//Componentes
import BankCard from "../components/BankCard/BankCard";
import Headers from "../components/Headers/Header";

//Estilização
import "./generalBills.css";
import DateFilter from "../components/Filters/DateFilter";
import RemainingValue from "../components/RemainingValue/RemainingValue";
import "../styles.css";

function GeneralBills() {
    const [message, setMessage] = useState({});
    const { client } = useMQTT();

    useEffect(() => {
        if (!client) return;

        function handleMessage(currentTopic, payload) {
            if (currentTopic === `${MQTT_TOPIC}-summary-interface`) {
                const groupedData = groupByBank(JSON.parse(payload.toString()));
                setMessage(groupedData);
            }
        }
        client.subscribe(`${MQTT_TOPIC}-summary-interface`);
        client.on('message', handleMessage);

        return () => {
            client.off('message', handleMessage)
            client.unsubscribe(`${MQTT_TOPIC}-summary-interface`);
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

    function sumBuyersValue() {
        let liviaTotals = 0;
        let williamTotals = 0;
        Object.entries(message).map(([banco, compradores]) => {
            if (compradores.Lívia != null) {
                liviaTotals += compradores.Lívia;
            }

            if (compradores.William != null) {
                williamTotals += compradores.William;
            }

        });
        return [liviaTotals, williamTotals];
    }


    return (
        <div>
            <Headers />
            <DateFilter endpoint={'somatotal'} />
            <div className="app-container">
                <h2 className="welcome-message">
                    Olá, {localStorage.getItem('username')}! Veja um resumo das suas contas
                </h2>
                <div>
                    {Object.entries(message).map(([banco, compradores]) => (
                        <BankCard key={banco} banco={banco} compradores={compradores} />
                    ))}
                </div>
                <RemainingValue buyersSum={sumBuyersValue()} />
            </div>
        </div>
    );
}

export default GeneralBills;