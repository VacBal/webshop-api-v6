import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div onClick={onClose} />
      <div>
        {children}
        <button onClick={onClose}>Bezárás</button>
      </div>
    </div>
  );
};

export default Modal;
