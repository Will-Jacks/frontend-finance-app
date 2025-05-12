import { useEffect, useRef, useState } from "react";
import "./meatballMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";

function MeatBallMenu({ toggleIsPaid, bill, onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }
    }, []);

    return (
        <div className="meatball-container" ref={menuRef}>
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
                        <div className="meatball-option paid-status" onClick={() => toggleIsPaid(bill.id)}>{bill.isPaid ? 'Pago' : 'Não pago'}<div className={`circle ${bill.isPaid ? 'paid' : 'not-paid'}`}></div></div>
                    </div>
                )
            }
        </div>
    )
}

export default MeatBallMenu;