import { X } from "lucide-react";
import Button from "./Button";

export function CloseButton({ onClose }) {
  return (
    <Button variant="ghost" size="sm" onClick={onClose}>
      <X className="w-5 h-5" />
    </Button>
  );
}
