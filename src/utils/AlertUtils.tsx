import Swal from "sweetalert2";

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

