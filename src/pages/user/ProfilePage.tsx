import React, { useEffect } from "react";
import { Box, Typography, Button, Grid, Divider, Card, CardContent, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUserContext } from "../../common/context/AuthContext";
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

  const currentUser = users?.find((u) => u.idUsuario === userContext?.idUsuario);
  const currentEmpleado = empleados?.find((e) => e.idEmpleado === currentUser?.idEmpleado);

  const handleEditProfile = () => {
    navigate("/editarperfil");
  };

  const renderLoading = () => (
    <Box sx={{ width: "100%", maxWidth: 600, mt: 4 }}>
      <Skeleton variant="rectangular" height={50} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </Box>
  );

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" gutterBottom>
        Perfil de Usuario
      </Typography>
      <Divider sx={{ width: "100%", mb: 3 }} />

      {currentUser ? (
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Información del Usuario
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Nombre:</strong> {currentUser.nombreUsuario}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Correo:</strong> {currentUser.correo}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography><strong>Administrador:</strong> {currentUser.isAdmin ? "Sí" : "No"}</Typography>
                </Grid>
                {currentUser.idUsuarioPadre && (
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>ID Usuario Padre:</strong> {currentUser.idUsuarioPadre}</Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {currentEmpleado && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Información del Empleado
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Nombre:</strong> {currentEmpleado.nombreEmpleado}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>CURP:</strong> {currentEmpleado.curp}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>RFC:</strong> {currentEmpleado.rfc}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>NSS:</strong> {currentEmpleado.nss}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Correo Laboral:</strong> {currentEmpleado.emailLaboral}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Correo Personal:</strong> {currentEmpleado.emailPersonal}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Teléfono Laboral:</strong> {currentEmpleado.numCelLaboral}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Teléfono Personal:</strong> {currentEmpleado.numCelPersonal}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Estatus:</strong> {currentEmpleado.estatus}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="primary" onClick={handleEditProfile}>
              Editar Perfil
            </Button>
          </Box>
        </Box>
      ) : (
        renderLoading()
      )}
    </Box>
  );
};

export default ProfilePage;
