import { useEffect, useState } from "react";
import Modal from 'react-modal';
import BillForm from "../BillForm/BillForm";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import './bottomComponent.css';

function BottomComponent({ message, setMessage, editingBill, setEditingBill }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingBill(null);
        window.location.reload();
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isModalOpen]);

    useEffect(() => {
        setIsModalOpen(!!editingBill); // abre se houver edição, fecha se for null
    }, [editingBill]);

    return (
        <>
            {/* FAB flutuante */}
            <button
                onClick={openModal}
                className="fab-add-button"
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>

            {/* Modal de criação */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Adicione uma nova conta"
                appElement={document.querySelector('#root')}
                className="create-bill-modal"
                overlayClassName="modal-overlay"
                closeTimeoutMS={300}
                ariaHideApp={false}
            >
                <button
                    onClick={closeModal}
                    className="close-modal-button"
                >
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>

                <div className="wrapper-create-bill-form">
                    <BillForm
                        message={message}
                        setMessage={setMessage}
                        editingBill={editingBill}
                        setEditingBill={setEditingBill}
                    />
                </div>
            </Modal >
        </>
    );
}

export default BottomComponent;
