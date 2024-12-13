import { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import GenericForm from "./Form";
import { showSuccessAlert, showErrorAlert } from "../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { UserService } from "../services/UserService";
import { CreateUserDto } from "../dtos/user/CreateUserDto";

interface UserFormValues {
  nombreUsuario: string;
  correo: string;
  password: string;
  idEmpleado: number | undefined; // idEmpleado puede ser null
  idUsuarioPadre: number | undefined; // idUsuarioPadre también puede ser null
  isAdmin: boolean;
}

export default function UsersForm() {
  const userService = new UserService();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const location = useLocation();

  // Estado inicial para el formulario
  const [formValues, setFormValues] = useState<UserFormValues>({
    nombreUsuario: "",
    correo: "",
    password: "",
    idEmpleado: undefined,
    idUsuarioPadre: undefined,
    isAdmin: false,
  });

  const [loading, setLoading] = useState(true);

  // Datos iniciales para edición
  const initialValues = location.state as CreateUserDto | null;

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        nombreUsuario: initialValues.nombreUsuario,
        correo: initialValues.correo,
        password: initialValues.password,
        idEmpleado: initialValues.idEmpleado ?? undefined, // Asigna null si no existe
        idUsuarioPadre: initialValues.idUsuarioPadre ?? undefined, // Asigna null si no existe
        isAdmin: initialValues.isAdmin,
      });
    }
    setLoading(false);
  }, [initialValues]);

  const handleSubmit = async (values: UserFormValues) => {
    try {
      if (initialValues) {
        // Actualización de usuario
        await userService.update(initialValues.idUsuarioPadre!, values); // idUsuarioPadre usado como identificador
        await showSuccessAlert(
          "El usuario fue actualizado correctamente.",
          prefersDarkMode
        );
      } else {
        // Creación de nuevo usuario
        await userService.create(values);
        await showSuccessAlert(
          "El usuario fue registrado correctamente.",
          prefersDarkMode
        );
      }
      navigate("/admin/users");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el manejo del usuario:", error);
    }
  };

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <GenericForm<UserFormValues>
      title={initialValues ? "Editar Usuario" : "Registrar Usuario"}
      fields={[
        { name: "nombreUsuario", label: "Nombre del Usuario", required: true },
        { name: "correo", label: "Correo", type: "email", required: true },
        { name: "password", label: "Contraseña", type: "password", required: !initialValues },
        {
          name: "idEmpleado",
          label: "Número de Empleado",
          type: "number",
          required: false, // Cambiado a no obligatorio
        },
        {
          name: "idUsuarioPadre",
          label: "ID de Usuario Creador",
          type: "number",
          required: false, // Cambiado a no obligatorio
        },
      ]}
      initialValues={formValues}
      onSubmit={(values) => handleSubmit({ ...values, isAdmin: formValues.isAdmin })}
      additionalComponents={
        <FormControlLabel
          control={
            <Checkbox
              checked={formValues.isAdmin}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  isAdmin: e.target.checked,
                }))
              }
              color="primary"
            />
          }
          label="Es Administrador"
        />
      }
    />
  );
}
