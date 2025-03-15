import { useEffect, useState } from "react";
import SumBills from "../sumBills/SumBills";
import Modal from 'react-modal';
import BillCreator from "../billCreator/BillCreator";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

import './bottomComponent.css';

function BottomComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
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
    }, [isModalOpen])


    return (
        <div className="main-container-bottom-component">
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
                    appElement={document.querySelector('#root')}
                    className='create-bill-modal'
                >

                    <div className="wrapper-create-bill-modal">
                        <button
                            onClick={closeModal}
                            className="close-modal-button"
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <BillCreator />
                    </div>

                </Modal>

            </div>
        </div>
    )

}

export default BottomComponent;