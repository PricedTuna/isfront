import React, { useState } from "react";
import { Box, TextField, Button, Typography, Divider, Alert, Card, CardContent } from "@mui/material";
import { useGetUserContext } from "../../common/context/AuthContext";
import { UserService } from "../../services/UserService";

const EditProfile: React.FC = () => {
  const userContext = useGetUserContext();
  const userService = new UserService();

  // Estados para editar perfil
  const [nombreUsuario, setNombreUsuario] = useState(userContext?.nombreUsuario || "");
  const [correo, setCorreo] = useState(userContext?.correo || "");
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Estados para cambio de contraseña
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  // Guardar cambios del perfil
  const handleSaveProfile = async () => {
    try {
      if (userContext?.idUsuario) {
        await userService.update(userContext.idUsuario, {
          nombreUsuario,
          correo,
        });
        setMensaje("Perfil actualizado con éxito.");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      setMensaje("Ocurrió un error al actualizar el perfil.");
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      if (userContext?.idUsuario) {
        await userService.update(userContext.idUsuario, {
          nombreUsuario: userContext.nombreUsuario, // Mantener otros campos existentes
          correo: userContext.correo,
          password: newPassword,
        });
        setPasswordMessage("Contraseña actualizada con éxito.");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setPasswordMessage("Ocurrió un error al cambiar la contraseña.");
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        Editar Perfil
      </Typography>
      <Divider sx={{ width: "100%", mb: 3 }} />

      {/* Mensaje de éxito o error */}
      {mensaje && <Alert severity="success" sx={{ mb: 3, maxWidth: 600 }}>{mensaje}</Alert>}

      {/* Formulario de edición de perfil */}
      <Card sx={{ width: "100%", maxWidth: 600, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información del Usuario
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nombre de Usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleSaveProfile}>
              Guardar Cambios
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Sección de cambio de contraseña */}
      <Card sx={{ width: "100%", maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Cambiar Contraseña
          </Typography>
          {passwordMessage && <Alert severity="info" sx={{ mb: 2 }}>{passwordMessage}</Alert>}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nueva Contraseña"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
            />
            <TextField
              label="Confirmar Nueva Contraseña"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="secondary" onClick={handleChangePassword}>
              Actualizar Contraseña
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditProfile;
