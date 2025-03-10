import { useState } from "react";
import SumBills from "../sumBills/SumBills";
import Modal from 'react-modal';
import BillCreator from "../billCreator/BillCreator";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './bottomComponent.css';

function BottomComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div>
            <SumBills />
            <div>

                <button
                    onClick={openModal}
                    className='button-add-bill'
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Adicione uma nova conta"
                >
                    <button onClick={closeModal}>X</button>
                    <BillCreator />

                </Modal>

            </div>
        </div>
    )

}

export default BottomComponent;