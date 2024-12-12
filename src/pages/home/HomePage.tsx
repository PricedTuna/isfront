import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetUserContext } from "../../common/context/AuthContext";
import useGetEmpleado from "../../common/hooks/useGetEmpleado";
import useGetAsistencias from "../../common/hooks/asistencia/useGetAsistencias";

function HomePage() {
  const user = useGetUserContext();
  const { fetchEmpleado, empleado } = useGetEmpleado();
  const { asistencias, fetchAsistencias } = useGetAsistencias();

  useEffect(() => {
    if (!user) return;

    fetchEmpleado(user.idEmpleado ?? 1);
    fetchAsistencias(user.idUsuario)
  }, [user]);

  return !empleado || !asistencias ? (
    <Box>
      <Typography textAlign="center" py={2} variant="h2" fontFamily={"Oswald"}>
        Loading component
      </Typography>
    </Box>
  ) : (
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2" fontFamily={"Oswald"}>
        {`Hola ${empleado.nombreEmpleado}`}
      </Typography>
      <Box>
        <Typography textAlign="center" py={2} variant="h4" fontFamily={"Rubik"}>
          total de asistencias: {asistencias.length}
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
