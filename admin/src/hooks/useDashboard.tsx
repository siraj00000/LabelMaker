import { useState, useEffect } from "react";

const useDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Function to check screen width and update isOpen accordingly
    const checkScreenWidth = () => {
      setIsOpen(window.innerWidth > 640);
    };

    // Add a resize event listener to check the screen width when it changes
    window.addEventListener("resize", checkScreenWidth);

    // Call the checkScreenWidth function initially to set isOpen based on the initial screen width
    checkScreenWidth();

    // Remove the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggleSideBar,
  };
};

export default useDashboard;
