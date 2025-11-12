import { useEffect, useState } from "react";
import Modal from 'react-modal';
import BillCreator from "../BillCreator/BillCreator";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './bottomComponent.css';
import useMQTT from "../../hooks/useMQTT";

function BottomComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { message, setMessage, editingBill, setEditingBill } = useMQTT();

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingBill(null);
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
            <button onClick={openModal} className="fab-add-button">
                <FontAwesomeIcon icon={faPlus} />
            </button>

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

                <div className="wrapper-create-bill-form">
                    <BillCreator
                        message={message}
                        setMessage={setMessage}
                        editingBill={editingBill}
                        setEditingBill={setEditingBill}
                        closeModal={closeModal}
                    />
                </div>
            </Modal >
        </>
    );
}

export default BottomComponent;
