import { IoNotificationsOutline } from "react-icons/io5";
import UniversalPopover from "./common/UniversalPopover";

const NotiPopover = () => {
  return (
    <UniversalPopover
      popoverButton={<IoNotificationsOutline size={24} className="hover:scale-105" />}
    >
      <div className="h-full w-full rounded-lg bg-white border-white drop-shadow-sm p-5">
        <aside>
          <h1 className="text-md font-semibold text-primaryDarkGray ">
            Notification
          </h1>
        </aside>
      </div>
    </UniversalPopover>
  );
};

export default NotiPopover;
