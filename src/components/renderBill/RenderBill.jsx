import { useEffect, useState } from "react";
import { client, topic } from "../../connection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './renderBill.css';
import BillCreator from "../billCreator/BillCreator";
import BuyerFilter from "../Filters/BuyerFilter";

import Modal from 'react-modal';


const RenderBill = () => {
    const [message, setMessage] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }



    useEffect(() => {
        client.subscribe(topic);
        client.publish(`${topic}-get`, 'parcial-bills'); // Dispara o método GET no backend MQTT

        client.on('message', (topic, payload) => {
            if (topic == "finance-bills-app") {
                setMessage([...message, ...JSON.parse(payload.toString())]); // ... Serve para desestruturar o JSON
            }
        });
    }, []);

    return (
        <div className="wrapper-container-bills-card">
            <div className="container-filter-buttons">
                <BuyerFilter />

                <div>
                    <button onClick={openModal}>Adicionar</button>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        contentLabel="Adicione uma nova conta"
                    >
                        <button onClick={closeModal}>X</button>
                        <BillCreator />

                    </Modal>
                </div>
                <div className="wrapper-bill-creator">
                </div>
            </div> {/* Isso dá pra abstrair em outro componente pra separar a lógica */}
            {
                message.length > 0 ?
                    message.map((bill, index) => {
                        return (
                            <div key={index} className="container-bills-card">
                                <div className="title-value-div">
                                    <h2>{bill.titulo}</h2>
                                    <p className="bill-value">{`R$${bill.valor}`}</p>
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
                    <p className="text-nothing-to-show">Nada a mostrar</p>
            }
        </div>
    )
};

export default RenderBill;