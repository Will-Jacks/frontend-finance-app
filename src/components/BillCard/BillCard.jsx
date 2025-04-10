//Util
import dateFormatter from "../../utils/dateFormatter";

//Estilização
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


function BillCard({ bill, onDelete }) {

    return (
        <div className="container-bills-card">
            <div className="title-date-div">
                <h2 className="bill-title">{bill.titulo}</h2>
                <div className="wrapper-billData-billBanco">
                    <p>{dateFormatter(bill.data)}</p>
                    <div className={`bank-title ${bill.banco.toLowerCase().replace(" ", "-")}`}></div>
                </div>
            </div>
            <p className="buyer">{bill.comprador}</p>
            <p className="bill-value">{`R$ ${Number(bill.valor).toFixed(2)}`}</p>
            <div className="wrapper-billCategory-trashIcon">
                <p className="bill-category">{bill.categoria}</p>
                <div className="wrapper-trash-icon">
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="trash-icon"
                        onClick={() => onDelete(bill.id)}
                    />
                </div>
            </div>
        </div>
    )
}

export default BillCard;