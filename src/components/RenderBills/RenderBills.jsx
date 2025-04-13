import { useState, useEffect } from "react";

//Conexões mqtt
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './renderBill.css';

//Componentes
import BuyerFilter from "../Filters/BuyerFilter";

//Util
import BillCard from "../BillCard/BillCard";

function RenderBills({ message, setMessage, setEditingBill }) {
    const { client } = useMQTT();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!client) return;

        const handleMessage = (currentTopic, payload) => {
            if (currentTopic === MQTT_TOPIC) {
                setMessage([...message, ...JSON.parse(payload.toString())]);
                setLoading(false);
            }
        }
        client.subscribe(MQTT_TOPIC);
        client.publish(`${MQTT_TOPIC}-get`, 'parcial-bills'); // Dispara o método GET no backend MQTT
        setLoading(true); // Exibir carregamento
        client.on('message', handleMessage);

        return () => {
            client.off('message', handleMessage)
            client.unsubscribe(MQTT_TOPIC);
        }
    }, [client]);

    function onDelete(id) {
        const confirm = window.confirm("Deseja realmente excluir?");
        if (confirm) {
            client.publish(`${MQTT_TOPIC}-delete`, String(id));
            const newArr = message.filter(bill => bill.id !== id);
            setMessage(newArr);
        } else {
            return;
        }
    }

    return (
        <div className="wrapper-container-bills-card">
            <div className="container-filter-buttons">
                <BuyerFilter />
            </div>
            {loading ? (
                <p className="text-loading">Carregando...</p>
            ) :
                message.length === 0 ? (
                    <p className="text-nothing-to-show">
                        Nenhuma conta a ser exibida no momento. Tente novamente mais tarde
                    </p>
                ) : null
            }
            <TransitionGroup>
                {
                    message.map((bill, index) => {
                        return (
                            <CSSTransition
                                key={bill.id}
                                timeout={300}
                                classNames="bills"
                            >
                                <BillCard
                                    bill={bill}
                                    onDelete={id => onDelete(id)}
                                    onEdit={() => setEditingBill(bill)}
                                />
                            </CSSTransition>
                        );
                    })

                }
            </TransitionGroup>
            <div className="blank-space"></div>
        </div>
    )
};

export default RenderBills;