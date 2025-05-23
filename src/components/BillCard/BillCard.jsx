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
                <div className="container-paid-circle-data">
                    <div className="wrapper-is-paid-circle-data">
                        <div className="wrapper-billData-billBanco">
                            <p>{dateFormatter(bill.data)}</p>
                        </div>
                    </div>
                    <div className={`bank-title ${formatBankClassName(bill.banco)}`}></div>
                </div>
            </div>
            <div className="container-isPaidCircle-buyer">
                <p className="buyer">{bill.comprador}</p>
                <div className="is-paid-circle">
                    <div className={`circle ${bill.isPaid ? 'paid' : 'not-paid'}`}></div>
                </div>
            </div>
            <p className="bill-value">{`R$ ${Number(bill.valor).toFixed(2)}`}</p>
            <div className="wrapper-billCategory-trashIcon">
                <div>
                    <p className="bill-category">{bill.categoria}</p>

                </div>
                <MeatBallMenu toggleIsPaid={toggleIsPaid} bill={bill} onEdit={onEdit} onDelete={onDelete} />
            </div>
        </div>
    )
}

export default BillCard;