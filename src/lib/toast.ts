import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

const toastStyles = {
  success: {
    color: "#fff",
    background: "#10B981",
  },
  error: {
    color: "#fff",
    background: "#EF4444",
  },
  warning: {
    color: "#fff",
    background: "#F59E0B",
  },
  info: {
    color: "#fff",
    background: "#3B82F6",
  },
};

export const showToast = (
  message: string,
  type: ToastType = "success",
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right" = "top-right",
) => {
  toast[type](message, {
    style: toastStyles[type],
    position: position,
  });
};

export const showSuccessToast = (message: string) =>
  showToast(message, "success");
export const showErrorToast = (message: string) => showToast(message, "error");
export const showWarningToast = (message: string) =>
  showToast(message, "warning");
export const showInfoToast = (message: string) => showToast(message, "info");
