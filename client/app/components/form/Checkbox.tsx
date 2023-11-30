'use client'

import React, { useState, useEffect } from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onChange();
  };

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        className="h-4 w-4 hover:scale-105 text-white accent-primaryGreen transition duration-150 ease-in-out"
        checked={isChecked}
        onChange={toggleCheckbox}
      />
      <span className="text-primaryGreen font-jakartaPlus sm:text-[14px] text-[12px] capitalize">{label}</span>
    </label>
  );
};

export default Checkbox;
