import { useState, useEffect } from "react";
import { client, topic } from "../../connection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './renderBill.css';
import BuyerFilter from "../Filters/BuyerFilter";

const RenderBill = () => {
    const [message, setMessage] = useState([]);
    

    function dateFormatter(date) {
        const month = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

        let formattedDate = "";
        for (let i = 0; i <= 1; i++) {
            formattedDate += date[i]; // retorna o dia
        }

        if (date[3] == 0) {
            const index = parseInt(date[4]);
            formattedDate += ` ${month[index - 1]}` // Adiciona o espaço entre as datas e o -1 é pra corrigir o índice do array
            return formattedDate; //Retorna a data já formatada
        }
        if (date[3] > 0) {
            const index = parseInt((date[3] + date[4])); // Soma os indices da string e transforma em inteiro pra dar o index do arr de meses
            formattedDate += ` ${month[index - 1]}`
            return formattedDate;
        }

    }

    useEffect(() => {
        client.subscribe(topic);
        client.publish(`${topic}-get`, 'parcial-bills'); // Dispara o método GET no backend MQTT

        client.on('message', (currentTopic, payload) => {
            if (currentTopic == topic) {
                setMessage([...message, ...JSON.parse(payload.toString())]); // ... Serve para desestruturar o JSON
            }
        });
    }, []);

    return (
        <div className="wrapper-container-bills-card">
            <div className="container-filter-buttons">
                <BuyerFilter />
            </div>



            {
                message.length > 0 ?
                    message.map((bill, index) => {
                        return (
                            <div key={index} className="container-bills-card">

                                <div className="title-date-div">

                                    <h2 className="bill-title">{bill.titulo}</h2>

                                    <div className="wrapper-billData-billBanco">
                                        <p>{dateFormatter(bill.data)}</p>
                                        <div className={`bank-title ${bill.banco.toLowerCase().replace(" ", "-")}`}></div>
                                    </div>

                                </div>

                                <p className="buyer">{bill.comprador}</p>

                                <p className="bill-value">{`R$ ${bill.valor.toFixed(2)}`}</p>

                                <div className="wrapper-billCategory-trashIcon">

                                    <p className="bill-category">{bill.categoria}</p>
                                    <div className="wrapper-trash-icon">
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            className="trash-icon"
                                            onClick={() => {
                                                client.publish(`${topic}-delete`, `${bill.id}`)
                                                //window.location.reload();
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        )
                    }) :
                    <p className="text-nothing-to-show">Nenhuma conta a ser exibida no momento. Tente novamente mais tarde</p>
            }
        </div>
    )
};

export default RenderBill;