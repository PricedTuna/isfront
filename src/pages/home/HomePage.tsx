import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUserContext } from "../../common/context/AuthContext";
import useCreateAsistencia from "../../common/hooks/asistencia/useCreateAsistencia";
import useGetAsistencias from "../../common/hooks/asistencia/useGetAsistencias";
import useGetTiposAsistencia from "../../common/hooks/asistencia/useGetTiposAsistencia";
import useCreatePermiso from "../../common/hooks/permiso/useCreatePermiso";
import useGetTiposPermiso from "../../common/hooks/permiso/useGetTiposPermiso";
import getSesionTrabajoByToken from "../../common/hooks/sesionesTarbajo/getSesionTrabajoByToken";
import useGetEmpleado from "../../common/hooks/useGetEmpleado";
import AsistenciaModal from "./components/AsistenciaModal";
import AsistenciaSummary from "./components/AsistenciaSummary";
import HistorialAsistenciasTable from "./components/HistorialAsistenciasTable";
import PermisoModal from "./components/PermisoModal";
import PermisosModal from "./components/PermisosModal";
import GraficaHorasPorTipo from "./components/GraficaHorasPorTipo";

function HomePage() {
  const user = useGetUserContext();
  const { fetchEmpleado, empleado } = useGetEmpleado();
  const { asistencias, fetchAsistencias } = useGetAsistencias();
  const { fetchTiposAsistencia, tiposAsistencia } = useGetTiposAsistencia();
  const { fetchTiposPermiso, tiposPermiso } = useGetTiposPermiso();
  const { fetchSesionTrabajoByToken } = getSesionTrabajoByToken();
  const { createPermiso } = useCreatePermiso();
  const { createAsistencia } = useCreateAsistencia();

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

    const sesionTrabajo = await fetchSesionTrabajoByToken(token);
    if (!sesionTrabajo) return;

    await createAsistencia({
      idEmpleado: user.idEmpleado,
      asistenciaInicio: new Date(),
      idTipoAsistencia,
      idSesionTrabajo: sesionTrabajo.idSesionTrabajo,
    });

    fetchAsistencias(user.idEmpleado);
    handleCloseAsistenciaModal();
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

  useEffect(() => {
    if (!user || !user.idEmpleado) return;
    fetchEmpleado(user.idEmpleado);
    fetchAsistencias(user.idEmpleado);
    fetchTiposAsistencia();
    fetchTiposPermiso();
  }, [user]);

  if (!user) return <></>;

  return (
    <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: "800px", width: "100%" }}>
        <Typography
          textAlign="center"
          py={2}
          variant="h2"
          fontFamily={"Oswald"}
        >
          {`Hola ${empleado?.nombreEmpleado}`}
        </Typography>
        <AsistenciaSummary asistencias={asistencias} />
        <Box maxHeight={'300px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <GraficaHorasPorTipo asistencias={asistencias??[]} />
        </Box>
        <Box mt={3} display={"flex"} flexDirection={"column"} gap={2}>
          <Button variant="contained" onClick={handleOpenAsistenciaModal}>
            Acceder a sesión de trabajo
          </Button>
          <Button variant="contained" onClick={handleOpenPermisoModal}>
            Solicitar permiso a sesión de trabajo
          </Button>
          <Button variant="contained" onClick={handleOpenPermisosModal}>
            Ver permisos registrados
          </Button>
        </Box>
        <Box mt={4}>
          <HistorialAsistenciasTable
            asistencias={asistencias}
            tiposAsistencia={tiposAsistencia ?? []}
          />
        </Box>
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
    </Box>
  );
}

export default HomePage;
