import React from "react";
import Modal from "../modal/modal";
import { Button } from "../button";

interface ModalConfirmProps {
  type: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  type,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      title="Confirmation"
      closeText="Cancel"
      onClose={onCancel}
    >
      <div>
        Are you sure to {type === "complete" ? "complete" : "delete"} this task?
      </div>

      <div className="text-center mb-2 mt-8">
        <Button
          variant={type === "complete" ? "info" : "error"}
          className="w-[180px]"
          onClick={onConfirm}
        >
          {type === "complete" ? "Complete" : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
