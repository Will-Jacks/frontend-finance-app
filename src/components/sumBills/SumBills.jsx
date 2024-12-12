import './sumBills.css';
import { client, topic } from "../../connection";
import { useEffect, useState } from 'react';
const SumBills = () => {

    //Faz o fetch no backend e retorna todas as bills
    const [message, setMessage] = useState([]);
    const [totalValueBill, setTotalValueBill] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);

    useEffect(() => {
        client.subscribe(topic);
        client.publish(`${topic}-get`, 'fetchUrl'); // Dispara o método GET no backend MQTT

        client.on('message', (topic, payload) => {
            if (topic == "finance-bills-app") {
                setMessage([...message, ...JSON.parse(payload.toString())]); // ... Serve para desestruturar o JSON
            }
        });
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('earning-input');
        if (storedData && storedData.length > 0) {
            setTotalEarnings(storedData);
        }
    }, []);

    useEffect(() => {
        const total = message.reduce((sum, bill) => sum + bill.valor, 0);
        setTotalValueBill(total);
    }, [message]); // Captura o JSON e soma todos os valores

    const saveEarningInput = (e) => {
        setTotalEarnings(e);
        localStorage.setItem('earning-input', e);
    } // Armazena o input digitado

    return (
        <div className='container-total-value-bill'>
            <h2>Gastos: R$ {totalValueBill.toFixed(2)}</h2>
            <div className="wrapper-gains-input-value">
                <h3>Ganhos: R$
                    <input
                        className='input-earning-value'
                        type="number"
                        value={totalEarnings}
                        content={totalEarnings}
                        onChange={(e) => saveEarningInput(e.target.value)}
                    />
                </h3>
            </div>
        </div>
    )
}

export default SumBills;