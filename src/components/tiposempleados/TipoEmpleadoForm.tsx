import GenericForm from "../Form";
import { showSuccessAlert, showErrorAlert } from "../../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TipoEmpleadoService } from "../../services/TiposEmpleadoService";

interface TipoEmpleadoFormValues {
  nombreTipoEmpleado: string;
}

export default function TipoEmpleadoForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const _tipoEmpleadoService = new TipoEmpleadoService();

  const handleSubmit = async (values: TipoEmpleadoFormValues) => {
    try {
      await _tipoEmpleadoService.create(values);
      await showSuccessAlert(
        "El tipo de empleado fue registrado correctamente.",
        prefersDarkMode
      );
      navigate("/admin/tipoempleado");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el registro del tipo de empleado:", error);
    }
  };

  return (
    <GenericForm<TipoEmpleadoFormValues>
      title="Registro de Tipo de Empleado"
      fields={[
        { name: "nombreTipoEmpleado", label: "Nombre del Empleado", required: true },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
