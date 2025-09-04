//Util
import dateFormatter from "../../utils/dateFormatter";

//Estilização
import './billCard.css';
import MeatBallMenu from "../MeatballMenu/MeatBallMenu";

function BillCard({ bill, onDelete, onEdit, toggleIsPaid }) {

    function formatBankClassName(bankName) {
        return bankName.toLowerCase().replace(' ', '-');
    }

    return (
        <div className="container-bills-card">
            <div className="title-date-div">
                <h2 className="bill-title">{bill.titulo}</h2>
                <div className="container-date">
                    <p className="bill-date">{dateFormatter(bill.data)}</p>
                </div>
            </div>

            <div className="card-body">
                <div className="card-main-info">
                    <p className="buyer">{bill.comprador}</p>
                    <p className="bill-value">{`R$ ${Number(bill.valor).toFixed(2)}`}</p>
                </div>
                <div className="is-paid-circle">
                    <div className={`circle ${bill.isPaid ? 'paid' : 'not-paid'}`}></div>
                </div>
            </div>

            <div className="wrapper-billCategory-trashIcon">
                <div className="card-tags">
                    <p className="bill-category">{bill.categoria}</p>
                    <span className={`bank-title ${formatBankClassName(bill.banco)}`}>
                        {bill.banco}
                    </span>
                </div>
                <MeatBallMenu toggleIsPaid={toggleIsPaid} bill={bill} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    )
}

export default BillCard;