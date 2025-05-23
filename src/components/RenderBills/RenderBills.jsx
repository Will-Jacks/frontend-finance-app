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
import { toast } from "react-toastify";
import DateFilter from "../Filters/DateFilter";

function RenderBills({ message, setMessage, setEditingBill }) {
    const { client } = useMQTT();
    const [loading, setLoading] = useState(true);
    const [billRendered, setBillRendered] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!loading) return;
            setLoading(false);
            toast.error("Servidor fora do ar!", {
                autoClose: 5000,
                closeOnClick: true
            });
        }, 2000);
        return () => {
            clearTimeout(timeout)
        }
    }, [loading]);

    useEffect(() => {
        setBillRendered(message);
    }, [message]);

    useEffect(() => { if (message.length > 0) setLoading(false) }, [message]);

    function onDelete(id) {
        const confirm = window.confirm("Deseja realmente excluir?");
        if (confirm) {
            client.publish(`${MQTT_TOPIC}-delete`, String(id));
            const messageWithoutExcludedBill = message.filter(bill => bill.id !== id);
            setMessage(messageWithoutExcludedBill);
        }
    }

    function toggleIsPaid(id) {
        const updatedBills = message.map(b => b.id === id ? { ...b, isPaid: !b.isPaid } : b); // Atualiza no front
        const billToggled = updatedBills.find(e => e.id === id); // Isola uma bill pra mandar pro back
        setMessage(updatedBills);
        client.publish(`${MQTT_TOPIC}-isPaid`, JSON.stringify(billToggled));
        toast.success('Conta atualizada com sucesso!');
    }

    return (
        <div className="wrapper-container-bills-card">
            <div className="container-filter-buttons">
                <BuyerFilter message={message} setBillRendered={setBillRendered} />
            </div>
            <div>
                <DateFilter endpoint={'home'} />
            </div>
            {loading ? (
                <p className="text-loading">Carregando...</p>
            ) :
                billRendered.length === 0 && (
                    <p className="text-nothing-to-show">
                        Nenhuma conta econtrada
                    </p>
                )
            }
            <TransitionGroup>
                {
                    billRendered.map((bill, index) => {
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
                                    toggleIsPaid={toggleIsPaid}
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