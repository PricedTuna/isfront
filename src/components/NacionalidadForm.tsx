import { useState } from "react";
import GenericForm from "./Form";
import { showSuccessAlert, showErrorAlert } from "../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface NationalityFormValues {
  nacionalidad: string;
}

export default function NacionalidadForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();

  const handleSubmit = async (values: NationalityFormValues) => {
    try {
      // Aquí puedes integrar la lógica para registrar o actualizar nacionalidades.
      console.log(values); // Simula el envío de datos

      // Simula un éxito
      await showSuccessAlert("La nacionalidad fue registrada correctamente.", prefersDarkMode);
      navigate("/admin/nacionalidades");
    } catch (error) {
      // Manejo de errores
      await showErrorAlert("Hubo un problema al procesar la solicitud. Inténtalo de nuevo.", prefersDarkMode);
      console.error("Error en el registro de nacionalidad:", error);
    }
  };

  return (
    <GenericForm<NationalityFormValues>
      title="Registro de Nacionalidad"
      fields={[
        { name: "nacionalidad", label: "Nacionalidad", required: true },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
