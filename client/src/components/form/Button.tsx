import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset'; // Adjust the allowed types as needed
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text }: ButtonProps) => (
  <div>
    <button
      type={type}
      className="flex w-full justify-center rounded-md bg-primary px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primard600"
    >
      {text}
    </button>
  </div>
);

export default Button;
