import GenericForm from "../Form";
import { showSuccessAlert, showErrorAlert } from "../../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TipoContratoService } from "../../services/TiposContratosService"

interface TipoContratoFormValues {
  descripcionContrato: string;
}

export default function TipoContratoForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const _tipoContratoService = new TipoContratoService();

  const handleSubmit = async (values: TipoContratoFormValues) => {
    try {
      await _tipoContratoService.create(values);
      await showSuccessAlert(
        "El tipo de contrato fue registrado correctamente.",
        prefersDarkMode
      );
      navigate("/admin/tipocontrato");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el registro del tipo de contrato:", error);
    }
  };

  return (
    <GenericForm<TipoContratoFormValues>
      title="Registro de Tipo de Contrato"
      fields={[
        { name: "descripcionContrato", label: "Descripción del Contrato", required: true },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
