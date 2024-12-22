import Swal from "sweetalert2";

interface DecisionAlertProps {
  title?: string;
  message: string;
  prefersDarkMode: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const showSuccessAlert = (message: string, prefersDarkMode: boolean) => {
  return Swal.fire({
    icon: "success",
    title: "¡Éxito!",
    text: message,
    background: prefersDarkMode ? "#1e1e1e" : "#ffffff",
    color: prefersDarkMode ? "#ffffff" : "#000000",
    confirmButtonColor: prefersDarkMode ? "#6200ea" : "#6200ea",
  });
};

export const showErrorAlert = (message: string, prefersDarkMode: boolean) => {
  return Swal.fire({
    icon: "error",
    title: "¡Error!",
    text: message,
    background: prefersDarkMode ? "#1e1e1e" : "#ffffff",
    color: prefersDarkMode ? "#ffffff" : "#000000",
    confirmButtonColor: prefersDarkMode ? "#cf6679" : "#d32f2f",
  });
};

export const showInfoAlert = (message: string, prefersDarkMode: boolean) => {
  return Swal.fire({
    icon: "info",
    title: "Información",
    text: message,
    background: prefersDarkMode ? "#1e1e1e" : "#ffffff",
    color: prefersDarkMode ? "#ffffff" : "#000000",
    confirmButtonColor: prefersDarkMode ? "#03dac6" : "#0288d1",
  });
};

export const showDecisionAlert = ({
  title,
  message,
  prefersDarkMode,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: DecisionAlertProps) => {
  Swal.fire({
    icon: "question",
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    background: prefersDarkMode ? "#1e1e1e" : "#ffffff",
    color: prefersDarkMode ? "#ffffff" : "#000000",
    confirmButtonColor: prefersDarkMode ? "#03dac6" : "#0288d1",
    cancelButtonColor: prefersDarkMode ? "#cf6679" : "#d32f2f",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm(); // Llamada cuando el usuario confirma
    } else if (result.isDismissed) {
      onCancel(); // Llamada cuando el usuario cancela
    }
  });
};
