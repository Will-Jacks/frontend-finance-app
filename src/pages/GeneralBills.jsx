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
import DateFilter from "../components/Filters/DateFilter";
import RemainingValue from "../components/RemainingValue/RemainingValue";

function GeneralBills() {
    const [message, setMessage] = useState({});
    const [liviaValue, setLiviaValue] = useState(localStorage.getItem("livia-gain-value") || 0);
    const [williamValue, setWilliamValue] = useState(localStorage.getItem("william-gain-value") || 0);
    const navigate = useNavigate();
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
            liviaTotals += compradores.Lívia;
            williamTotals += compradores.William;
        });
        return [liviaTotals, williamTotals];
    }

    function handleValue(buyer, e) {
        const newValue = e.target.value;
        if (buyer === "William") {
            setWilliamValue(newValue);
            localStorage.setItem('william-gain-value', newValue);
            return;
        }
        if (buyer === "Lívia") {
            setLiviaValue(newValue);
            localStorage.setItem('livia-gain-value', newValue);
            return;
        }
    }

    return (
        <div className="general-bills-container">
            <Headers />
            <DateFilter endpoint={'somatotal'} />
            <div>
                <h2>Informe seus ganhos</h2>
                <p>Lívia: </p><input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.,]?[0-9]*"
                    placeholder="Digite aqui"
                    value={liviaValue}
                    onChange={(e) => handleValue("Lívia", e)}
                    required
                />
                <p>William: </p><input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.,]?[0-9]*"
                    placeholder="Digite aqui"
                    value={williamValue}
                    onChange={(e) => handleValue("William", e)}
                    required
                />
            </div>
            <div>
                <h2 style={{ textAlign: "justify" }}>Olá, {localStorage.getItem('username')}! Veja um resumo das suas contas</h2>
            </div>
            <div>
                {Object.entries(message).map(([banco, compradores]) => (
                    <BankCard key={banco} banco={banco} compradores={compradores} />
                ))}
            </div>
            <div>
                <RemainingValue buyersSum={sumBuyersValue()} />
            </div>
        </div>
    );
}

export default GeneralBills;