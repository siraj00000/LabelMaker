import React, { useState, useEffect } from 'react';

interface FormikCheckboxProps {
    label: string;
    checked?: boolean;
    setFieldValue: any;
    setFieldName: string;
    accentColor?: string;
    onChange?: (isChecked: boolean) => void
}

const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ label, checked = false, setFieldName, setFieldValue, accentColor, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const toggleFormikCheckbox = () => {
        setIsChecked(!isChecked);
        setFieldValue(setFieldName, !isChecked);
        onChange && onChange(!isChecked);
    };

    return (
        <label className="flex items-center space-x-2">
            <input
                type="checkbox"
                className={`h-4 w-4 hover:scale-105 transition duration-150 ease-in-out ${accentColor}`}
                checked={isChecked}
                onChange={toggleFormikCheckbox}
            />
            <span className=" font-jakartaPlus text-primaryDarkGray text-sm max-sm:text-xs capitalize">{label.split('_').join(" ")}</span>
        </label>
    );
};

export default FormikCheckbox;
