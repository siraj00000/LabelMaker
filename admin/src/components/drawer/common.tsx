import React, { Fragment, useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';

type CommonDrawerProps = {
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  toggleButton: React.ReactNode;
  children: React.ReactNode;
  screenWidth?: string;
};

const CommonDrawer: React.FC<CommonDrawerProps> = ({ toggleButton, isDrawerOpen, closeDrawer, children, screenWidth }) => {
  const [dynamicDrawerWidth, setDynamicDrawerWidth] = useState<string | number>('90%');

  useEffect(() => {
    // Function to update dynamicDrawerWidth based on screen width
    const updateDynamicDrawerWidth = () => {
      if (window.innerWidth > 850) {
        setDynamicDrawerWidth(screenWidth ? screenWidth : '50%');
      } else if (window.innerWidth > 700) {
        setDynamicDrawerWidth('60%');
      } else {
        setDynamicDrawerWidth('90%');
      }
    };

    // Initial update
    updateDynamicDrawerWidth();

    // Add a resize event listener to update dynamicDrawerWidth when the window is resized
    const handleResize = () => {
      updateDynamicDrawerWidth();
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dynamicDrawerWidth, screenWidth]); // Include dynamicDrawerWidth in the dependency array

  return (
    <>
      <Fragment>{toggleButton}</Fragment>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        direction="right"
        className="max-sm:w-full"
        size={dynamicDrawerWidth}
        duration={1000}
      >
        {isDrawerOpen && children}
      </Drawer>
    </>
  );
};

export default CommonDrawer;
