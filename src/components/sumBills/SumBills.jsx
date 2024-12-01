import './sumBills.css';
import { client, topic } from "../../connection";
import { useEffect, useState } from 'react';
const SumBills = () => {

    //Faz o fetch no backend e retorna todas as bills
    const [message, setMessage] = useState([]);
    const [totalValueBill, setTotalValueBill] = useState(0);

    useEffect(() => {
        client.subscribe(topic);
        client.publish(`${topic}-get`, 'fetchUrl'); // Dispara o método GET no backend MQTT

        client.on('message', (topic, payload) => {
            if (topic == "finance-bills-app") {
                setMessage([...message, ...JSON.parse(payload.toString())]); // ... Serve para desestruturar o JSON
            }
        });
    }, []);

    useEffect(()=> {
        const total = message.reduce((sum, bill) => sum + bill.valor, 0);
        setTotalValueBill(total);
    }, [message]);

    return (
        <div className='container-total-value-bill'>
            <h2>Total: R$ {totalValueBill.toFixed(2)}</h2>
        </div>
    )
}

export default SumBills;