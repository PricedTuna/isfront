import ListIcon from "@mui/icons-material/List";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import WorkIcon from "@mui/icons-material/Work";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUserContext } from "../../common/context/AuthContext";
import useCreateAsistencia from "../../common/hooks/asistencia/useCreateAsistencia";
import useFinalizarAsistencia from "../../common/hooks/asistencia/useFinalizarAsistencia";
import useGetAsistencias from "../../common/hooks/asistencia/useGetAsistencias";
import useGetTiposAsistencia from "../../common/hooks/asistencia/useGetTiposAsistencia";
import useCreatePermiso from "../../common/hooks/permiso/useCreatePermiso";
import useGetTiposPermiso from "../../common/hooks/permiso/useGetTiposPermiso";
import getSesionTrabajoByToken from "../../common/hooks/sesionesTarbajo/getSesionTrabajoByToken";
import useGetEmpleado from "../../common/hooks/useGetEmpleado";
import AsistenciaModal from "./components/AsistenciaModal";
import HistorialAsistenciasTable from "./components/HistorialAsistenciasTable";
import PermisoModal from "./components/PermisoModal";
import PermisosModal from "./components/PermisosModal";
import { showErrorAlert } from "../../utils/AlertUtils";
import { useNavigate } from "react-router";

export enum asistenciaErrors {
  ASISTENCIA_ACTIVE_YET = "ASISTENCIA_ACTIVE_YET",
  SESION_TRABAJO_NOT_FOUND = "SESION_TRABAJO_NOT_FOUND",
}

function HomePage() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const user = useGetUserContext();
  const { fetchEmpleado, empleado } = useGetEmpleado();
  const { asistencias, fetchAsistencias } = useGetAsistencias();
  const { fetchTiposAsistencia, tiposAsistencia } = useGetTiposAsistencia();
  const { finalizarAsistencia } = useFinalizarAsistencia();
  const { fetchTiposPermiso, tiposPermiso } = useGetTiposPermiso();
  const { fetchSesionTrabajoByToken } = getSesionTrabajoByToken();
  const { createPermiso } = useCreatePermiso();
  const { createAsistencia } = useCreateAsistencia();
  const navigate = useNavigate();

  const [isAsistenciaModalOpen, setIsAsistenciaModalOpen] = useState(false);
  const [isPermisoModalOpen, setIsPermisoModalOpen] = useState(false);
  const [isPermisosModalOpen, setIsPermisosModalOpen] = useState(false);

  const handleOpenPermisosModal = () => setIsPermisosModalOpen(true);
  const handleClosePermisosModal = () => setIsPermisosModalOpen(false);

  const handleOpenAsistenciaModal = () => setIsAsistenciaModalOpen(true);
  const handleCloseAsistenciaModal = () => setIsAsistenciaModalOpen(false);

  const handleOpenPermisoModal = () => setIsPermisoModalOpen(true);
  const handleClosePermisoModal = () => setIsPermisoModalOpen(false);

  const handleAccederSesionTrabajo = async (
    idTipoAsistencia: number,
    token: string
  ) => {
    if (!user || !user.idEmpleado) return;

    try {
      if (asistencias && asistencias[0].asistenciaFin == undefined){
        console.log(asistencias[0]);
        console.log(asistencias[0].asistenciaFin);
        throw new Error(asistenciaErrors.ASISTENCIA_ACTIVE_YET);
      }

      const sesionTrabajo = await fetchSesionTrabajoByToken(token);
      if (!sesionTrabajo)
        throw new Error(asistenciaErrors.SESION_TRABAJO_NOT_FOUND);

      const asistencia = await createAsistencia({
        idEmpleado: user.idEmpleado,
        asistenciaInicio: new Date(),
        idTipoAsistencia,
        idSesionTrabajo: sesionTrabajo.idSesionTrabajo,
      });

      fetchAsistencias(user.idEmpleado);
      navigate(`/asistenciaInfo/${asistencia?.idAsistencia}`);
    } catch (error: any) {
      if (error.message === asistenciaErrors.ASISTENCIA_ACTIVE_YET) {
        showErrorAlert("Ya tienes una asistencia activa", prefersDarkMode);
      } else if (error.message === asistenciaErrors.SESION_TRABAJO_NOT_FOUND) {
        showErrorAlert("Sesión de trabajo no encontrada, verifique el token", prefersDarkMode);
      } else {
        showErrorAlert(
          "Error accediendo a la sesión de trabajo",
          prefersDarkMode
        );
      }
      console.error("Error accediendo a la sesión de trabajo:", error);
    } finally {
      handleCloseAsistenciaModal();
    }
  };

  const handleSolicitarPermiso = async (
    idTipoPermiso: number,
    descripcion: string,
    token: string
  ) => {
    if (!user || !user.idEmpleado) return;
    const sesionTrabajo = await fetchSesionTrabajoByToken(token);
    if (!sesionTrabajo) return;

    await createPermiso({
      descripcion: descripcion,
      estatus: "A",
      idEmpleado: user.idEmpleado,
      idSesionTrabajo: sesionTrabajo.idSesionTrabajo,
      idTipoPermiso,
    });
    handleClosePermisoModal();
  };

  const handleFinalizarAsistencia = async (idAsistencia: number) => {
    if (!user || !user.idEmpleado) return;

    try {
      await finalizarAsistencia(idAsistencia, { asistenciaFin: new Date() });
      fetchAsistencias(user.idEmpleado);
      console.log("Asistencia finalizada");
    } catch (error) {
      console.error("Error finalizando la asistencia:", error);
      showErrorAlert("Error finalizando la asistencia", prefersDarkMode);
    }
  };

  useEffect(() => {
    if (!user || !user.idEmpleado) return;
    fetchEmpleado(user.idEmpleado);
    fetchAsistencias(user.idEmpleado);
    fetchTiposAsistencia();
    fetchTiposPermiso();
  }, [user]);

  if (!user) return <></>;

  return (
    <Box p={2}>
      <Container maxWidth="sm">
        <Typography textAlign="center" variant="h4" fontFamily="Roboto">
          {`Hola ${empleado?.nombreEmpleado}`}
        </Typography>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<WorkIcon />}
              onClick={handleOpenAsistenciaModal}
            >
              Acceder a sesión de trabajo
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<PermIdentityIcon />}
              onClick={handleOpenPermisoModal}
            >
              Solicitar permiso
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<ListIcon />}
              onClick={handleOpenPermisosModal}
            >
              Ver permisos solicitados
            </Button>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          {asistencias && asistencias?.length > 0 ? (
            <>
              <Typography variant="h5">Última asistencia</Typography>
              <HistorialAsistenciasTable
                asistencias={asistencias ? [asistencias[0]] : []}
                onFinalizar={handleFinalizarAsistencia}
                tiposAsistencia={tiposAsistencia ?? []}
              />
            </>
          ) : (
            <Typography>No hay asistencias registradas</Typography>
          )}
        </Box>
      </Container>
      <AsistenciaModal
        isOpen={isAsistenciaModalOpen}
        onClose={handleCloseAsistenciaModal}
        tiposAsistencia={tiposAsistencia ?? []}
        onAccederSesionTrabajo={handleAccederSesionTrabajo}
      />

      <PermisoModal
        isOpen={isPermisoModalOpen}
        onClose={handleClosePermisoModal}
        tiposPermiso={tiposPermiso ?? []}
        onSolicitarPermiso={handleSolicitarPermiso}
      />

      <PermisosModal
        isOpen={isPermisosModalOpen}
        onClose={handleClosePermisosModal}
        idEmpleado={user.idEmpleado ?? 0}
      />
    </Box>
  );
}

export default HomePage;
