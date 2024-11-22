import { useEffect, useState } from "react";
import { client, topic } from "../../connection";



const RenderBill = () => {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        client.subscribe(topic);
        client.publish(`${topic}-get`, 'fetchUrl'); // Dispara o método GET no backend MQTT

        client.on('message', (topic, payload) => {
            if (topic == "finance-bills-app") {
                setMessage([...message, ...JSON.parse(payload.toString())]); // ... Serve para desestruturar o JSON
            }
            
        });
    }, []);




    return (
        <div>{
            message.length > 0 ?
                message.map((bill, index) => {
                    return (
                        <div key={index}>
                            <h2>{bill.titulo}</h2>
                            <p>{`R$ ${bill.valor}`}</p>
                            <p>{bill.descricao}</p>
                            <p>{bill.estabelecimento}</p>
                            <p>{bill.formaDePagamento}</p>
                            <p>{bill.banco}</p>
                            <p>{bill.comprador}</p>
                            <p>{bill.categoria}</p>
                        </div>
                    )
                }) :
                <p>Nada a mostrar</p>
        }
        </div>
    )
};

export default RenderBill;