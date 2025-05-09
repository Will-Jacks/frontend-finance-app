import { useEffect, useState } from "react";
import { MQTT_TOPIC } from "../../context/MQTTContext";
import useMQTT from "../../hooks/useMQTT";
import "./dateFilter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function DateFilter({ endpoint }) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const { client } = useMQTT();
    const [initialDateFilter, setInitialDateFilter] = useState(getFormattedDate(firstDay));
    const [endDateFilter, setEndDateFilter] = useState(getFormattedDate(lastDay));
    const [isFilterActive, setIsFilterActive] = useState(false);


    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function handleDate(e) {
        e.preventDefault();
        if (endpoint === "somatotal") {
            client.publish(`${MQTT_TOPIC}-somatotal&home`, `http://192.168.0.33:8080/bill/totals-by-period?inicio=${initialDateFilter}&fim=${endDateFilter}`);

        }
        if (endpoint === "home") {
            client.publish(`${MQTT_TOPIC}-somatotal&home`, `http://192.168.0.33:8080/bill/bills-by-period?inicio=${initialDateFilter}&fim=${endDateFilter}`);
        }
    }

    useEffect(() => {
        if (client) {
            client.publish(`${MQTT_TOPIC}-somatotal&home`, `http://192.168.0.33:8080/bill/totals-by-period?inicio=${initialDateFilter}&fim=${endDateFilter}`);
        }
        //Vai atualizar o summary-interface com as bills do mês atual
        //[O que faz com que retorne o somatório é a URL totals-by-period]
        //[Depende da lógica de datas feita no início deste código]
    }, [client]);


    return (
        <div>
            <button className="filter-button" onClick={() => setIsFilterActive(prev => !prev)} >
                (+) Filtros
            </button>
            <form onSubmit={handleDate} className={`search-itens ${isFilterActive}`}>
                <h3>Pesquisar por período</h3>
                <label htmlFor="">Data inicial</label>
                <input type="date" name="" id="" onChange={e => setInitialDateFilter(e.target.value)} />
                <label htmlFor="">Data final</label>
                <input type="date" onChange={e => setEndDateFilter(e.target.value)} />
                <button type="submit">{<FontAwesomeIcon icon={faMagnifyingGlass} />}</button>
            </form>
        </div>
    );
}

export default DateFilter;