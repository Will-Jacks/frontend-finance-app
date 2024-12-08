import { useEffect, useState } from "react";
import { client, topic } from "../../connection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './renderBill.css';


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
        <div className="wrapper-container-bills-card">
            <div className="wrapper-filters-button">
                <button onClick={()=> client.publish(`${topic}-filtro-comprador`, 'livia')}>Lívia</button>
                <button onClick={()=> client.publish(`${topic}-filtro-comprador`, 'william')}>William</button>
                <button onClick={()=> client.publish(`${topic}-filtro-comprador`, 'miriam')}>Miriam</button>
            </div>
            {
            message.length > 0 ?
                message.map((bill, index) => {
                    return (
                        <div key={index} className="container-bills-card">
                            <div className="title-value-div">
                                <h2>{bill.titulo}</h2>
                                <p>{`R$${bill.valor}`}</p>
                            </div>

                            <p>{bill.descricao}</p>
                            <p>{bill.estabelecimento}</p>
                            <div className="estab-form-pag-div">
                                <p>{bill.formaDePagamento}</p>
                                <p>{bill.banco}</p>
                            </div>
                            <p>{bill.comprador}</p>
                            <div className="wrapper-categ-trash-icon">
                                <p>{bill.categoria}</p>
                                <FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={() => {
                                    client.publish(`${topic}-delete`, `${bill.id}`)
                                    window.location.reload();
                                }} />
                            </div>
                        </div>
                    )
                }) :
                <p>Nada a mostrar</p>
        }
        </div>
    )
};

export default RenderBill;