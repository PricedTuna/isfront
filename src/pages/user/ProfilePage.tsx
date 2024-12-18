import React, { useEffect } from "react";
import { Box, Typography, Button, Grid, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUserContext } from "../../common/context/AuthContext"
import useGetEmpleado from "../admin/empleado/hooks/use-get-empleado"; // Hook para datos de empleados
import useGetUsers from "../admin/users/hooks/useGetUsers"; // Hook para datos de usuarios

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const userContext = useGetUserContext();
  const { fetchEmpleados, empleados } = useGetEmpleado();
  const { fetchUsers, users } = useGetUsers();

  useEffect(() => {
    fetchUsers(); // Cargar usuarios
    fetchEmpleados(); // Cargar empleados
  }, [fetchUsers, fetchEmpleados]);

  // Obtener información del usuario actual
  const currentUser = users?.find((u) => u.idUsuario === userContext?.idUsuario);
  const currentEmpleado = empleados?.find((e) => e.idEmpleado === currentUser?.idEmpleado);

  const handleEditProfile = () => {
    navigate("/editarperfil");
  };

  const handleChangePassword = () => {
    navigate("/cambiarcontraseña");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {currentUser ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Información del Usuario</Typography>
              <Typography><strong>Nombre:</strong> {currentUser.nombreUsuario}</Typography>
              <Typography><strong>Correo:</strong> {currentUser.correo}</Typography>
              <Typography><strong>Administrador:</strong> {currentUser.isAdmin ? "Sí" : "No"}</Typography>
              {currentUser.idUsuarioPadre && (
                <Typography><strong>ID Usuario Padre:</strong> {currentUser.idUsuarioPadre}</Typography>
              )}
            </Grid>

            {currentEmpleado && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6">Información del Empleado</Typography>
                  <Typography><strong>Nombre:</strong> {currentEmpleado.nombreEmpleado}</Typography>
                  <Typography><strong>CURP:</strong> {currentEmpleado.curp}</Typography>
                  <Typography><strong>RFC:</strong> {currentEmpleado.rfc}</Typography>
                  <Typography><strong>NSS:</strong> {currentEmpleado.nss}</Typography>
                  <Typography><strong>Correo Laboral:</strong> {currentEmpleado.emailLaboral}</Typography>
                  <Typography><strong>Correo Personal:</strong> {currentEmpleado.emailPersonal}</Typography>
                  <Typography><strong>Teléfono Laboral:</strong> {currentEmpleado.numCelLaboral}</Typography>
                  <Typography><strong>Teléfono Personal:</strong> {currentEmpleado.numCelPersonal}</Typography>
                  <Typography><strong>Estatus:</strong> {currentEmpleado.estatus}</Typography>
                </Grid>
              </>
            )}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEditProfile}>
              Editar Perfil
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleChangePassword}>
              Cambiar Contraseña
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>Cargando información del perfil...</Typography>
      )}
    </Box>
  );
};

export default ProfilePage;
