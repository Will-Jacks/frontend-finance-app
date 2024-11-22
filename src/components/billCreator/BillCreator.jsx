import { useState } from "react";
import { client, topic } from "../../connection";

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

    const sendMessage = (data)=> {
        client.publish(`${topic}-post`, data);
    }

    const [titulo, setTitulo] = useState("");
    const [valor, setValor] = useState("");
    const [descricao, setDescricao] = useState("");
    const [estabelecimento, setEstabelecimento] = useState("");
    const [formaDePagamento, setFormaDePagamento] = useState("credito");
    const [banco, setBanco] = useState("nubank");
    const [comprador, setComprador] = useState("livia");
    const [categoria, setCategoria] = useState("alimentacao");
    

    function onSubmit(e) {
        e.preventDefault();

        const bill = new Bill(titulo, valor, descricao, estabelecimento, formaDePagamento, banco, comprador, categoria);
        const formattedMessage = JSON.stringify(bill);
        sendMessage(formattedMessage);
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Título</label>
            <input
                type="text"
                placeholder="Digite aqui"
                onChange={(e) => setTitulo(e.target.value)}
                value={titulo}
                autoFocus
            />

            <label>Valor</label>
            <input
                type="number"
                placeholder="Digite aqui"
                value={valor}
                onChange={(e) => { setValor(e.target.value) }}
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
                <option value="credito">Crédito</option>
                <option value="debito">Débito</option>
                <option value="pix">Pix</option>
                <option value="dinheiro">Dinheiro</option>
            </select>

            <label>Banco</label>
            <select
                name=""
                id=""
                value={banco}
                onChange={(e) => { setBanco(e.target.value) }}>
                <option value="nubank">Nubank</option>
                <option value="santander">Santander</option>
                <option value="c6">C6</option>
                <option value="will-bank">Will Bank</option>
            </select>

            <label htmlFor="">Comprador</label>
            <select
                name=""
                id=""
                value={comprador}
                onChange={(e) => { setComprador(e.target.value) }}>
                <option value="livia">Lívia</option>
                <option value="miriam">Miriam</option>
                <option value="william">William</option>
            </select>

            <label htmlFor="">Categoria</label>
            <select
                name=""
                id=""
                value={categoria}
                onChange={(e) => { setCategoria(e.target.value) }}>
                <option value="alimentacao">Alimentação</option>
                <option value="gasolina">Gasolina</option>
                <option value="cosmeticos">Cosméticos</option>
                <option value="contas-fixas">Contas fixas</option>
                <option value="roupas">Roupas</option>
                <option value="assinaturas">Assinaturas</option>
                <option value="outros">Outros</option>
            </select>

            <button type="submit">Criar</button>
        </form>
    )
}

export default BillCreator;