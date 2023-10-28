import React from "react";

type ActionButtonProps = {
  bg: string;
  title: string;
  Icon: React.ElementType;
  onClick: () => void;
  disabled?: boolean
};

const ActionButton: React.FC<ActionButtonProps> = ({ bg, title, Icon, onClick, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className={`${bg} disabled:hidden max-sm:w-full font-medium md:text-sm max-sm:text-md bg-white  hover:scale-105 text-primaryDarkGray sm:ml-2 flex items-center justify-center gap-2 py-2 px-3 max-sm:my-2 rounded-md`}
      onClick={onClick}
    >
      <Icon />
      {title}
    </button>
  );
};

export default ActionButton;
