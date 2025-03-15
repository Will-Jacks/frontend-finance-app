import "./buyerFilter.css";
import { client, topic } from "../../connection";

export default function BuyerFilter() {


    return (
        <div className="wrapper-filter-buttons">
            <button onClick={() => client.publish(`${topic}-get`, 'parcial-bills')}>Recentes</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador`, 'livia')}>Lívia</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador`, 'william')}>William</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador`, 'miriam')}>Miriam</button>
            <button onClick={() => client.publish(`${topic}-get`, 'fetchUrl')}>Todos</button>
        </div>
    )
}