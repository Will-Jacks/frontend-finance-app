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
import Analytics from "../components/Charts/Analytics";
import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";

function GeneralBills() {
    const [message, setMessage] = useState({});
    const { client } = useMQTT();
    const income = localStorage.getItem('income') || 0;
    const outcome = sumBuyersValue().reduce((a, b) => a + b, 0);
    const remaining = income - outcome;

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
            <div className="flex">
                <h2 className="page-title">Dashboard</h2>
                <DateFilter endpoint={'somatotal'} />
            </div>

            <div className="stats-grid">
                <div className="income stat-card">
                    <div className="stat-label"> <DollarSign size={20} /> Renda</div>
                    <p className="stat-value">R$ {income}</p>
                </div>
                <div className="outcome stat-card">
                    <div className="stat-label"> <TrendingDown size={20} color="var(--danger)" /> Despesas</div>
                    <p className="stat-value text-danger">R$ {outcome}</p>
                </div>
                <div className="remaining stat-card">
                    <div className="stat-label"> <TrendingUp size={20} color="var(--success)" /> Restante</div>
                    <p className="stat-value text-success">R$ {remaining}</p>
                </div>
            </div>
            <Analytics />
            <div className="bank-cards-container">
                {Object.entries(message).map(([banco, compradores]) => (
                    <BankCard key={banco} banco={banco} compradores={compradores} />
                ))}
            </div>
            <div className="app-container">
                {/* <RemainingValue buyersSum={sumBuyersValue()} /> */}
            </div>

        </div>
    );
}

export default GeneralBills;