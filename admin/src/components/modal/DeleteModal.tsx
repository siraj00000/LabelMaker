import React from 'react'
import Modal from './common'
import ComfirmationModal from './ComfirmationModal'
import useModal from '../../hooks/useModal';

type DeleteModalProps = {
    deleteHandler: () => void;
    buttonLayout: React.ReactNode;
    deleteButtonTitle: string
}

const DeleteModal = ({ deleteHandler, buttonLayout, deleteButtonTitle }: DeleteModalProps) => {
    const { handleCloseModal, type, handleOpenModal } = useModal();

    return (
        <Modal
            toggleBtn={
                <div onClick={() => handleOpenModal(deleteButtonTitle)} className='max-sm:flex-1'>
                    {buttonLayout}
                </div>
            }
            open={type === deleteButtonTitle}
            handleCloseModal={handleCloseModal}
            maxWidth="max-w-sm"
        >
            <ComfirmationModal
                title="Confirm Delete"
                deleteButtonTitle={deleteButtonTitle}
                message={`Are you sure you want to delete?`}
                deleteHandler={deleteHandler}
                closeModal={handleCloseModal}
            />
        </Modal>
    )
}

export default DeleteModal
