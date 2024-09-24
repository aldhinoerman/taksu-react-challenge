import React from "react";
import { Button } from "../button";

interface ModalProps extends React.PropsWithChildren {
  width?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  closeText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closeText,
  width,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal modal-open">
        <div
          className={`modal-box ${
            width ? `max-w-[${width}px]` : "max-w-[425px]"
          }`}
        >
          {/* Modal Header */}
          <div className="modal-header flex justify-between items-center">
            <h3 className="text-2xl">{title}</h3>
          </div>

          {/* Modal Body */}
          <div className="modal-content mt-4">{children}</div>

          {/* Modal Footer */}
          <div className="text-center">
            <Button
              variant={"primary"}
              onClick={onClose}
              className="text-secondary"
            >
              {closeText ?? "Close"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
