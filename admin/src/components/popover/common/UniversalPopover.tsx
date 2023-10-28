import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

type UniversalPopoverProps = {
  extraStyles?: string;
  children: React.ReactNode;
  popoverButton: React.ReactNode;
};

const UniversalPopover: React.FC<UniversalPopoverProps> = ({
  popoverButton,
  children,
  extraStyles,
}) => {
  return (
    <div>
      <Popover className="relative">
        <Popover.Button>
          {popoverButton}
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className={`${extraStyles} transform absolute right-1/2 z-10 mt-3 sm:px-0 lg:max-w-3xl`}
          >
            {children}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};
export default UniversalPopover;
