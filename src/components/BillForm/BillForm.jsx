import { useRef, useState } from "react";

//Urls MQTT
import useMQTT from "../../hooks/useMQTT";
import { MQTT_TOPIC } from "../../context/MQTTContext";

//Estilização
import "./billCreator.css";
import { toast } from "react-toastify";

class Bill {
    constructor(titulo, valor, banco, comprador, categoria, data, hora) {

        this.titulo = titulo;
        this.valor = valor;
        this.banco = banco;
        this.comprador = comprador;
        this.categoria = categoria;
        this.data = data;
        this.hora = hora;
    }
}

function BillForm({ message, setMessage, editingBill, setEditingBill }) {
    const inputRef = useRef(null); // Serve para selecionar o input ao receber foco
    const { client } = useMQTT();

    const sendMessage = (data) => {
        client.publish(`${MQTT_TOPIC}-post`, data);
    }

    const [titulo, setTitulo] = useState(editingBill?.titulo || "");
    const [valor, setValor] = useState(editingBill?.valor || 0);
    const [banco, setBanco] = useState(editingBill?.banco || "Nubank");
    const [comprador, setComprador] = useState(editingBill?.comprador || "Lívia");
    const [categoria, setCategoria] = useState(editingBill?.categoria || "Alimentação");


    function capitalizeFirstLetter(title) {
        let capitalizedString = title[0].toUpperCase();
        for (let i = 1; i < title.length; i++) {
            capitalizedString += title[i];
        }

        return capitalizedString;
    }

    function onSubmit(e) {
        e.preventDefault();
        if (editingBill) {
            // 🛠️ Editando uma conta existente
            const updatedBill = {
                ...editingBill,
                titulo,
                valor: valor.toFixed(2),
                banco,
                comprador,
                categoria
            };

            client.publish(`${MQTT_TOPIC}-put`, JSON.stringify(updatedBill));
            const updatedList = message.map(b => b.id === updatedBill.id ? updatedBill : b);
            setMessage(updatedList);
            toast.success('Conta atualizada com sucesso!');
            setEditingBill(null);
        } else {
            const currentDate = new Date();
            const newBill = new Bill(
                capitalizeFirstLetter(titulo),
                valor.toFixed(2),
                banco,
                comprador,
                categoria,
                currentDate.toLocaleDateString('pt-BR'),
                currentDate.toLocaleTimeString('pt-BR')
            );
            const formattedMessage = JSON.stringify(newBill);
            sendMessage(formattedMessage);
            setMessage([newBill, ...message]);
            toast.success('Conta nova criada!');
        }
        setTitulo("");
        setValor(0);
    }

    return (
        <div className="main-container-bill-creator">
            <form onSubmit={onSubmit} className="form-container-bill-creator">
                <label>Título</label>
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
                    type="number"
                    placeholder="Digite aqui"
                    value={valor}
                    onChange={(e) => { setValor(Number(e.target.value)) }}
                    onFocus={() => inputRef.current.select()}
                    ref={inputRef}
                    required
                />

                <label>Banco</label>
                <select
                    name=""
                    id=""
                    value={banco}
                    onChange={(e) => { setBanco(e.target.value) }}>
                    <option value="Nubank">Nubank</option>
                    <option value="Santander">Santander</option>
                    <option value="C6">C6</option>
                    <option value="Will Bank">Will Bank</option>
                    <option value="Bradesco">Bradesco</option>
                </select>

                <label htmlFor="">Comprador</label>
                <select
                    name=""
                    id=""
                    value={comprador}
                    onChange={(e) => { setComprador(e.target.value) }}>
                    <option value="Lívia">Lívia</option>
                    <option value="William">William</option>
                    <option value="Miriam">Miriam</option>
                </select>

                <label htmlFor="">Categoria</label>
                <select
                    name=""
                    id=""
                    value={categoria}
                    onChange={(e) => { setCategoria(e.target.value) }}>
                    <option value="Alimentação">Alimentação</option>
                    <option value="Assinaturas">Assinaturas</option>
                    <option value="Contas Fixas">Contas fixas</option>
                    <option value="Cosméticos">Cosméticos</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Pets">Pets</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Outros">Outros</option>
                </select>

                <button type="submit">Confirmar</button>
            </form>



        </div>
    )
}

export default BillForm;