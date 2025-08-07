import { useToastContext } from "./ToastProvider";

export default function useToast() {
  const { addToast } = useToastContext();

  return {
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    info: (msg) => addToast(msg, "info"),
  };
}
