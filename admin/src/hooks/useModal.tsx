import { useState } from "react";

const useModal = () => {
  const [type, setType] = useState("");

  const handleOpenModal = (type: string) => {
    setType(type);
  };

  const handleCloseModal = () => {
    setType("");
  };

  return {
    type,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
