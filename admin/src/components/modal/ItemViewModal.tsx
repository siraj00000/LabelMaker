import React from 'react'
import Modal from './common'
import useModal from '../../hooks/useModal';

type ItemViewModalProps = {
    contentLayout: React.ReactNode;
    buttonLayout: React.ReactNode;
    viewButtonTitle: string
}

const ItemViewModal = ({ contentLayout, buttonLayout, viewButtonTitle }: ItemViewModalProps) => {
    const { handleCloseModal, type, handleOpenModal } = useModal();

    return (
        <Modal
            toggleBtn={
                <div onClick={() => handleOpenModal(viewButtonTitle)} className='max-sm:flex-1'>
                    {buttonLayout}
                </div>
            }
            open={type === viewButtonTitle}
            handleCloseModal={handleCloseModal}
            maxWidth="max-w-[80%]"
        >
            {contentLayout}
        </Modal>
    )
}

export default ItemViewModal