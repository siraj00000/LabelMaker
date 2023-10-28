import React from 'react'
import { MdDelete } from 'react-icons/md';

type ComfirmationModalProps = {
    closeModal: () => void;
    title: string;
    message: string;
    deleteHandler: () => void;
    deleteButtonTitle: string;
}

const ComfirmationModal = ({ closeModal, title, message, deleteHandler, deleteButtonTitle }: ComfirmationModalProps) => {
    const handleDeleteAndCloseModal = ()=>{
        deleteHandler();
        closeModal();
    }
    return (
        <div className="w-full transform text-center overflow-hidden rounded-2xl bg-transparent px-6 py-16 align-middle transition-all">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
                {title}
            </h3>
            <div className="mt-2">
                <p className="text-md text-gray-500">
                    {message}
                </p>
            </div>

            <div className="mt-8 space-x-3 flex items-center justify-center">
                <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-primaryDarkGray hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                >
                    Close
                </button>
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 outline-none capitalize"
                    onClick={handleDeleteAndCloseModal}
                >
                    <MdDelete size={17} /> {deleteButtonTitle}
                </button>
            </div>
        </div>
    )
}

export default ComfirmationModal
