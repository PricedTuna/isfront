import { useState } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import GenericForm from "./Form";
import { showSuccessAlert, showErrorAlert } from "../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface UserFormValues {
  nombreUser: string;
  correoUser: string;
  passwordUser: string;
  numeroEmpleado: string;
}

export default function UsersForm() {
  const [isAdmin, setIsAdmin] = useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      // Aquí puedes integrar la lógica para registrar o actualizar usuarios.
      console.log({ ...values, isAdmin }); // Incluye el estado del checkbox en los valores enviados

      // Simula un éxito
      await showSuccessAlert("El usuario fue registrado correctamente.", prefersDarkMode);
      navigate("/admin/users");
    } catch (error) {
      // Manejo de errores
      await showErrorAlert("Hubo un problema al procesar la solicitud. Inténtalo de nuevo.", prefersDarkMode);
      console.error("Error en el registro de usuario:", error);
    }
  };

  return (
    <GenericForm<UserFormValues>
      title="Registro de Usuario"
      fields={[
        { name: "nombreUser", label: "Nombre del Usuario", required: true },
        { name: "correoUser", label: "Correo", type: "email", required: true },
        { name: "passwordUser", label: "Contraseña", type: "password", required: true },
        { name: "numeroEmpleado", label: "Número de Empleado", required: true },
      ]}
      onSubmit={handleSubmit}
      additionalComponents={
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              color="primary"
            />
          }
          label="Es Administrador"
        />
      }
    />
  );
}
