// A basic react component that renders a modal with a close button.

import { useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ children, isOpen, close }: Props) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-content">{children}</div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={() => close()}
            ></button>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
