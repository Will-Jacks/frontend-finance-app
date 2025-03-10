import './sumBills.css';
import { client, topic } from "../../connection";
import { useEffect, useState } from 'react';



function SumBills() {

    //Faz o fetch no backend e retorna todas as bills
    const [message, setMessage] = useState([]);
    const [totalValueBill, setTotalValueBill] = useState(0);

    useEffect(() => {
        client.subscribe(topic);

        client.on('message', (topic, payload) => {
            if (topic == "finance-bills-app") {
                setMessage([...message, ...JSON.parse(payload.toString())]); // ... Serve para desestruturar o JSON
            }
        });
    }, []);

    useEffect(() => {
        const total = message.reduce((sum, bill) => sum + bill.valor, 0);
        setTotalValueBill(total);
    }, [message]); // Captura o JSON e soma todos os valores

    return (
        <div className='wrapper-totalValue'>
            <h2>Total: R$ {totalValueBill.toFixed(2)}</h2>
            
        </div>
    )
}

export default SumBills;

