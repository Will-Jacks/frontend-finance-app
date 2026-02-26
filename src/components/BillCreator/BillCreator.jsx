import { useState } from "react";

//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./billCreator.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

//config
import { BANCOS, COMPRADORES, CATEGORIAS, parcelaOptions } from "../../config/config";

function BillCreator({ message, setMessage, editingBill, setEditingBill, closeModal }) {
    const { client } = useMQTT();
    const [titulo, setTitulo] = useState(editingBill?.titulo || "");
    const [valor, setValor] = useState(editingBill?.valor || "");
    const [parcelas, setParcelas] = useState(editingBill?.parcelas || 0);
    const [banco, setBanco] = useState(editingBill?.banco || "Nubank");
    const [comprador, setComprador] = useState(editingBill?.comprador || "Miriam");
    const [categoria, setCategoria] = useState(editingBill?.categoria || "Alimentação");
    const [data, setData] = useState(editingBill?.data || "");



    function capitalizeFirstLetter(title) {
        const trimmed = title.trim();
        if (!trimmed) return "";
        const capitalizedString = trimmed[0].toUpperCase() + trimmed.slice(1);
        return capitalizedString;
    }

    function sendMessage(topicSufix, data) {
        client.publish(`${MQTT_TOPIC}-${topicSufix}`, data);
    }

    function editBill() {
        const updatedBill = {
            ...editingBill,
            titulo,
            valor: Number(valor).toFixed(2),
            parcelas,
            banco,
            comprador,
            categoria,
            data
        };
        sendMessage("put", JSON.stringify(updatedBill));
        const updatedList = message.map(b => b.id === updatedBill.id ? updatedBill : b);
        setMessage(updatedList);
        setEditingBill(null);
    }

    function createBill() {
        const currentDate = new Date();
        const newBill = {
            titulo: capitalizeFirstLetter(titulo),
            valor: Number(valor).toFixed(2),
            parcelas: parcelas,
            banco: banco,
            comprador: comprador,
            categoria: categoria,
            data: data || currentDate.toLocaleDateString('sv-SE'),
            hora: currentDate.toLocaleTimeString('pt-BR')
        };
        const formattedMessage = JSON.stringify(newBill);
        console.log(formattedMessage);
        sendMessage('post', formattedMessage);//-----------//
    }

    function onSubmit(e) {
        e.preventDefault();
        if (editingBill) {
            editBill();
            return;
        }
        createBill();
        setTitulo("");
        setValor(0);
        setParcelas(0);
    }

    function handleValueInput(e) {
        const eventValue = e.target.value;
        const valorDigitado = eventValue.replace(',', '.');
        const regex = /^[0-9]*([.,][0-9]*)?$/;
        if (regex.test(eventValue)) {
            setValor(valorDigitado);
        }
    }

    return (
        <form onSubmit={onSubmit} className="form-container-bill-creator">
            <div className="title-button-wrapper">
                <label>Título</label>
                <button onClick={closeModal} id="close-modal-button" type="button">
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            </div>
            <input
                type="text"
                placeholder="Digite aqui"
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
                autoFocus
                required
            />
            <label>Valor</label>
            <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]*"
                placeholder="Digite aqui"
                value={valor}
                onChange={(e) => handleValueInput(e)}
                required
            />
            <label>Parcelas</label>
            <select
                onChange={(e) => {
                    if (e.target.value == "À vista") {
                        setParcelas(0);
                    } else {
                        setParcelas(e.target.value);
                    }
                }}>
                {parcelaOptions.map((parcela) => (
                    <option value={parcela}>{parcela}</option>
                ))}
            </select>
            <label>Data</label>
            <input
                type="date"
                value={data}
                className="bill-creator-date-input"
                onChange={(e) => setData(e.target.value)} />
            <label>Banco</label>
            <select
                className="bill-creator-select"
                value={banco}
                onChange={(e) => { setBanco(e.target.value) }}>
                {BANCOS.map((banco) => (
                    <option key={banco} value={banco}>{banco}</option>
                ))}
            </select>
            <label htmlFor="">Comprador</label>
            <select
                className="bill-creator-select"
                value={comprador}
                onChange={(e) => { setComprador(e.target.value) }}>
                {COMPRADORES.map(comprador => (
                    <option value={comprador} key={comprador}>{comprador}</option>
                ))}
            </select>
            <label htmlFor="">Categoria</label>
            <select
                className="bill-creator-select"
                value={categoria}
                onChange={(e) => { setCategoria(e.target.value) }}>
                {CATEGORIAS.map(categoria => (
                    <option value={categoria} key={categoria}>{categoria}</option>
                ))}
            </select>
            <button type="submit">{editingBill ? "Atualizar" : "Criar"}</button>
        </form>
    )
}
export default BillCreator;