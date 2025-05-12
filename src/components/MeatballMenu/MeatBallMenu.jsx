import { useState } from "react";
import "./meatballMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";

function MeatBallMenu({ toggleIsPaid, bill, onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    return (
        <div className="meatball-container">
            <button
                onClick={toggleMenu}
                className="meatball-button"
            >
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            {
                isOpen && (
                    <div className="meatball-menu">
                        <div className="meatball-option" onClick={onEdit}>Editar &nbsp;&nbsp;✏️</div>
                        <div className="meatball-option delete" onClick={() => onDelete(bill.id)}>Excluir <FontAwesomeIcon icon={faTrash} style={{
                            color: "#ff5c5c",
                            marginLeft: "8px"
                        }} />
                        </div>
                        <div className="meatball-option" onClick={() => toggleIsPaid(bill.id)}>{bill.isPaid ? 'Pago' : 'Não pago'}<div className={`circle ${bill.isPaid ? 'paid' : 'not-paid'}`}></div></div>
                    </div>
                )
            }
        </div>
    )
}

export default MeatBallMenu;