import "./buyerFilter.css";
import { client, topic } from "../../connection";

export default function BuyerFilter() {


    return (
        <div className="wrapper-filter-buttons">
            <button onClick={() => client.publish(`${topic}-get`, 'parcial-bills')}>Recentes</button>
            <button onClick={() => client.publish(`${topic}-get`, 'fetchUrl')}>Todos</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador`, 'livia')}>Lívia</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador`, 'william')}>William</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador`, 'miriam')}>Miriam</button>
            <div className="splitter"></div>
            <button onClick={() => client.publish(`${topic}-filtro-banco`, 'nubank')}>Nubank</button>
            <button onClick={() => client.publish(`${topic}-filtro-banco`, 'santander')}>Santander</button>
            <div className="splitter"></div>

            <button
                onClick={() => client.publish(`${topic}-filtro-comprador-banco`, '{"comprador": "livia","banco":"santander"}')} id="filter-button-santander-livia">Lib</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador-banco` , '{"comprador": "william","banco":"santander"}')}
                id="filter-button-santander-william">Will</button>
            <div className="splitter"></div>
            <button onClick={() => client.publish(`${topic}-filtro-comprador-banco`, '{"comprador": "livia","banco":"nubank"}')}
                id="filter-button-nubank-livia">Lib</button>
            <button onClick={() => client.publish(`${topic}-filtro-comprador-banco`,'{"comprador": "william","banco":"nubank"}')}
                id="filter-button-nubank-william">Will</button>
        </div>
    )
}