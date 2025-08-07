"use client";

import Modal from "./Modal";
import Button from "./Button";

export default function FormModal({
  isOpen,
  onClose,
  title,
  onSubmit,
  children,
  submitText = "Save",
  loading = false,
  disableSubmit = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || disableSubmit} loading={loading}>
            {submitText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
