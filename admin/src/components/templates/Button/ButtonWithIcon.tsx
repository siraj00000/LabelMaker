import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  title: string;
  extraStyles?: string;
  iconStyles?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  Icon: React.ElementType;
};

const ButtonsWithIcon: React.FC<ButtonProps> = ({
  type = "button",
  title,
  handleClick,
  extraStyles,
  iconStyles,
  disabled = false,
  Icon,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick}
      className={`flex items-center gap-2 w-full bg-primaryGreen rounded-md py-[12px] px-[22px] text-lightSlate text-[0.9375rem] font-jakartaPlus ${extraStyles}`}
    >
      <Icon size={20} className={iconStyles} />
      <span>{title}</span>
    </button>
  );
};

export default ButtonsWithIcon;
