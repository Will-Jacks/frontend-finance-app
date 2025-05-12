import { useState } from "react";
import "./meatballMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons";

function MeatBallMenu() {
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
                        <div className="meatball-option">Editar &nbsp;&nbsp;✏️</div>
                        <div className="meatball-option delete">Excluir <FontAwesomeIcon icon={faTrash} style={{
                            color: "#ff5c5c",
                            marginLeft: "8px"
                        }} /></div>
                    </div>
                )
            }
        </div>
    )
}

export default MeatBallMenu;