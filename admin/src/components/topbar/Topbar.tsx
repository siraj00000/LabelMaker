import useModal from "../../hooks/useModal";
import SearchModalBody from "../modal/SearchModalBody";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import Modal from "../modal/common";
import NotiPopover from "../popover/NotiPopover";
import ProfilePopover from "../popover/ProfilePopover";

type TopbarProps = {
  toggleSideBar: () => void;
};

const Topbar: React.FC<TopbarProps> = ({ toggleSideBar }) => {
  const { handleCloseModal, type, handleOpenModal } = useModal();
  return (
    <div className="w-full py-4 px-10 max-sm:px-5 grid grid-cols-2">
      <aside className="col-span-1 flex items-center gap-4">
        <button onClick={toggleSideBar}>
          <IoMenuOutline size={28} className="hover:scale-110" />
        </button>
        <Modal
          toggleBtn={
            <button onClick={() => handleOpenModal("search")}>
              <IoSearchOutline size={20} className="hover:scale-110" />
            </button>
          }
          open={type === 'search'}
          handleCloseModal={handleCloseModal}
        >
          {/* Content for the modal */}
          <SearchModalBody onClose={handleCloseModal} />
        </Modal>
      </aside>
      <aside className="col-span-1 flex items-end justify-end space-x-6">
        <NotiPopover />
        <ProfilePopover />
      </aside>
    </div>
  );
};

export default Topbar;
