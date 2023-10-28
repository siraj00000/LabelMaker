import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

interface ToggleSwitchProps {
  status: boolean;
  onStatusChange: (newStatus: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ status, onStatusChange }) => {
  const [enabled, setEnabled] = useState(status);

  const handleToggle = () => {
    const newStatus = !enabled;
    setEnabled(newStatus);
    onStatusChange(newStatus);
  };

  return (
    <div className="py-1 space-x-2 flex items-center">
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`${enabled ? 'bg-primaryGreen' : 'bg-gray-400'
          } relative inline-flex h-[18px] w-[38px] hover:scale-105 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default ToggleSwitch;
