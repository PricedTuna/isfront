import GenericForm from "../Form";
import { showSuccessAlert, showErrorAlert } from "../../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TipoAsistenciaService } from "../../services/TiposAsistenciaService";

interface TipoAsistenciaFormValues {
  nombreAsistencia: string;
}

export default function TipoAsistenciaForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const _tipoAsistenciaService = new TipoAsistenciaService();

  const handleSubmit = async (values: TipoAsistenciaFormValues) => {
    try {
      await _tipoAsistenciaService.create(values);
      await showSuccessAlert(
        "El tipo de asistencia fue registrado correctamente.",
        prefersDarkMode
      );
      navigate("/admin/tipoasistencia");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el registro del tipo de asistencia:", error);
    }
  };

  return (
    <GenericForm<TipoAsistenciaFormValues>
      title="Registro de Tipo de Asistencia"
      fields={[
        { name: "nombreAsistencia", label: "Nombre de la Asistencia", required: true },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
