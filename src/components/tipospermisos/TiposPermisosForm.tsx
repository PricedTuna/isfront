import GenericForm from "../Form";
import { showSuccessAlert, showErrorAlert } from "../../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TipoPermisoService } from "../../services/TiposPermisosService";

interface TipoPermisoFormValues {
  nombrePermiso: string;
}

export default function TipoPermisoForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const _tipoPermisoService = new TipoPermisoService();

  const handleSubmit = async (values: TipoPermisoFormValues) => {
    try {
      await _tipoPermisoService.create(values);
      await showSuccessAlert(
        "El tipo de permiso fue registrado correctamente.",
        prefersDarkMode
      );
      navigate("/admin/tipospermisos");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el registro del tipo de permiso:", error);
    }
  };

  return (
    <GenericForm<TipoPermisoFormValues>
      title="Registro de Tipo de Permiso"
      fields={[
        { name: "nombrePermiso", label: "Nombre del Permiso", required: true },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
