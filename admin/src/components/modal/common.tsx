// Modal.tsx
import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalProps = {
  children?: ReactNode;
  open: boolean;
  handleOpenModal?: () => void;
  handleCloseModal?: () => void;
  toggleBtn: React.ReactNode;
  maxWidth?: string;
};

export default function Modal({
  children,
  toggleBtn,
  open,
  handleCloseModal,
  maxWidth = 'max-w-lg'
}: ModalProps) {
  return (
    <>
      <Fragment>
        {toggleBtn}
      </Fragment>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 overflow-y-auto z-50"
          onClose={handleCloseModal!}
        >
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-60 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className={`${maxWidth} z-10 w-full my-8 mx-auto bg-white rounded-lg shadow-xl text-left sm:my-12`}>
                {children} {/* Use childrenWithProps */}
                <button
                  className="absolute -top-10 -right-12 p-2 m-2 text-primaryGreen hover:ring-2 hover:ring-primaryGreen bg-white shadow rounded-full"
                  onClick={handleCloseModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
