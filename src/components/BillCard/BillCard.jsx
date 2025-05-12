//Util
import dateFormatter from "../../utils/dateFormatter";

//Estilização
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './billCard.css';
import MeatBallMenu from "../MeatballMenu/MeatBallMenu";

function BillCard({ bill, onDelete, onEdit, toggleIsPaid }) {

    return (
        <div className="container-bills-card">
            <div className="title-date-div">
                <h2 className="bill-title">{bill.titulo}</h2>
                <div className="container-paid-circle-data">
                    <div className="wrapper-is-paid-circle-data">
                        <div className="is-paid-circle" onClick={() => toggleIsPaid(bill.id)}>
                            <div className={`circle ${bill.isPaid ? 'paid' : 'not-paid'}`}></div>
                        </div>
                        <div className="wrapper-billData-billBanco">
                            <p>{dateFormatter(bill.data)}</p>
                        </div>
                    </div>
                    <div className={`bank-title ${bill.banco.toLowerCase().replace(" ", "-")}`}></div>
                </div>
            </div>
            <p className="buyer">{bill.comprador}</p>
            <p className="bill-value">{`R$ ${Number(bill.valor).toFixed(2)}`}</p>
            <div className="wrapper-billCategory-trashIcon">
                <p className="bill-category">{bill.categoria}</p>
                <MeatBallMenu />
                {/* <div className="wrapper-trash-icon">
                    <button onClick={onEdit}>✏️</button>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="trash-icon"
                        onClick={() => onDelete(bill.id)}
                    />
                </div> */}
            </div>
        </div>
    )
}

export default BillCard;