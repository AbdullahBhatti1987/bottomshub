"use client";

import Modal from "./Modal"; 
import Button from "./Button";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, itemName = "item" }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth={"max-w-lg"} title="Confirm Deletion">
      <div className="p-4 text-center ">
        <h2 className="text-lg font-semibold mb-2">Confirm Deletion</h2>
        <p className="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <span className="font-medium">{itemName}</span>?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
