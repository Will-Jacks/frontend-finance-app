import { useState } from "react";
import { client, topic } from "../../connection";
import "./billCreator.css";

export class Bill {
    constructor(titulo, valor, descricao, estabelecimento, formaDePagamento, banco, comprador, categoria) {

        this.titulo = titulo;
        this.valor = valor;
        this.descricao = descricao;
        this.estabelecimento = estabelecimento;
        this.formaDePagamento = formaDePagamento;
        this.banco = banco;
        this.comprador = comprador;
        this.categoria = categoria;
    }
}

const BillCreator = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const sendMessage = (data) => {
        client.publish(`${topic}-post`, data);
    }

    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estabelecimento, setEstabelecimento] = useState("");
    const [formaDePagamento, setFormaDePagamento] = useState("Crédito");
    const [banco, setBanco] = useState("Nubank");
    const [comprador, setComprador] = useState("Lívia");
    const [categoria, setCategoria] = useState("Alimentação");


    function onSubmit(e) {
        e.preventDefault();
        const bill = new Bill(titulo, valor, descricao, estabelecimento, formaDePagamento, banco, comprador, categoria);
        const formattedMessage = JSON.stringify(bill);
        sendMessage(formattedMessage);
        setIsFormVisible(false);
        setTitulo("")
        setValor("")
        setDescricao("")
        setEstabelecimento("")
        window.location.reaload();
    }

    return (
        <div className="main-container-bill-creator">
            <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="toggle-form-button"
            >
                {isFormVisible ? "Minimizar" : "Registrar gasto "}
            </button>
            {
                isFormVisible && (
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

                        <label>Descrição</label>
                        <input
                            type="text"
                            placeholder="Digite aqui"
                            value={descricao}
                            onChange={(e) => { setDescricao(e.target.value) }}
                        />

                        <label>Estabelecimento</label>
                        <input
                            type="text"
                            placeholder="Digite aqui"
                            value={estabelecimento}
                            onChange={(e) => { setEstabelecimento(e.target.value) }}
                        />

                        <label>Forma de pagamento</label>
                        <select
                            name=""
                            id=""
                            value={formaDePagamento}
                            onChange={(e) => { setFormaDePagamento(e.target.value) }}>
                            <option value="Crédito">Crédito</option>
                            <option value="Débito">Débito</option>
                            <option value="Pix">Pix</option>
                            <option value="Dinheiro">Dinheiro</option>
                        </select>

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
                )
            }

        </div>
    )
}

export default BillCreator;