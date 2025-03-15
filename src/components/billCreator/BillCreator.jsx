import { useState } from "react";
import { client, topic } from "../../connection";
import "./billCreator.css";

export class Bill {
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

const BillCreator = () => {

    const sendMessage = (data) => {
        client.publish(`${topic}-post`, data);
    }

    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [banco, setBanco] = useState("Nubank");
    const [comprador, setComprador] = useState("Lívia");
    const [categoria, setCategoria] = useState("Alimentação");


    function capitalizeFirstLetter(title) {
        let capitalizedString = title[0].toUpperCase();
        for (let i = 1; i < title.length; i++) {
            capitalizedString += title[i];
        }

        return capitalizedString;
    }

    function onSubmit(e) {
        e.preventDefault();
        const currentDate = new Date(); // Captura a data atual do sistema quando

        

        const bill = new Bill(capitalizeFirstLetter(titulo), valor, banco, comprador, categoria, currentDate.toLocaleDateString('pt-BR'), currentDate.toLocaleTimeString('pt-BR'));
        const formattedMessage = JSON.stringify(bill);
        sendMessage(formattedMessage);

        setTitulo("")
        setValor("")
        //window.location.reload();
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
                    onChange={(e) => { setValor(e.target.value) }}
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
                    <option value="Gasolina">Gasolina</option>
                    <option value="Cosméticos">Cosméticos</option>
                    <option value="Contas Fixas">Contas fixas</option>
                    <option value="Roupas">Roupas</option>
                    <option value="Assinaturas">Assinaturas</option>
                    <option value="Outros">Outros</option>
                </select>

                <button type="submit">Criar</button>
            </form>



        </div>
    )
}

export default BillCreator;