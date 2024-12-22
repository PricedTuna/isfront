import { Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { useGetUserContext } from "../../../common/context/AuthContext";
import useFinalizarAsistencia from "../../../common/hooks/asistencia/useFinalizarAsistencia";
import useGetAsistencias from "../../../common/hooks/asistencia/useGetAsistencias";
import useGetTiposAsistencia from "../../../common/hooks/asistencia/useGetTiposAsistencia";
import useGetEmpleado from "../../../common/hooks/useGetEmpleado";
import AsistenciaSummary from "../components/AsistenciaSummary";
import GraficaHorasPorTipo from "../components/GraficaHorasPorTipo";
import HistorialAsistenciasTable from "../components/HistorialAsistenciasTable";
import { showErrorAlert } from "../../../utils/AlertUtils";

function AsistenciasPage() {
  const user = useGetUserContext();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { asistencias, fetchAsistencias } = useGetAsistencias();
  const { fetchTiposAsistencia, tiposAsistencia } = useGetTiposAsistencia();
  const { fetchEmpleado, empleado } = useGetEmpleado();
  const { finalizarAsistencia } = useFinalizarAsistencia();

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
  }, [user]);

  return (
    <Box p={2} sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ maxWidth: "800px", width: "100%" }}>
        <Typography
          textAlign="center"
          py={2}
          variant="h2"
          fontFamily={"Oswald"}
        >
          {`Asistencias de ${empleado?.nombreEmpleado}`}
        </Typography>
        <AsistenciaSummary asistencias={asistencias} />
        <Box
          maxHeight={"300px"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <GraficaHorasPorTipo asistencias={asistencias ?? []} />
        </Box>
        <Box mt={4}>
          <HistorialAsistenciasTable
            asistencias={asistencias}
            tiposAsistencia={tiposAsistencia ?? []}
            onFinalizar={handleFinalizarAsistencia}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default AsistenciasPage;
