import React from "react";

type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  title: string;
  extraStyles?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
};

const Buttons: React.FC<ButtonProps> = ({
  type = "button",
  title,
  handleClick,
  extraStyles,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={handleClick}
      className={`w-full bg-primaryGreen rounded-md py-[12px] px-[22px] text-white text-[0.9375rem] font-jakartaPlus ${extraStyles}`}
    >
      {title}
    </button>
  );
};

export default Buttons;
