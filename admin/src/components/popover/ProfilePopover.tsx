import UniversalPopover from "./common/UniversalPopover";
import Avatar from "../profile/Avatar";

const ProfilePopover = () => {
  return (
    <UniversalPopover
      popoverButton={<Avatar />}
    >
      <div className="h-full w-full rounded-lg bg-white border-white drop-shadow-sm p-5">
        <aside>
          <h1 className="text-md font-semibold text-primaryDarkGray ">
            Profile
          </h1>
        </aside>
      </div>
    </UniversalPopover>
  );
};

export default ProfilePopover;
