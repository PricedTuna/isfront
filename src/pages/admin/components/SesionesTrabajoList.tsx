import { Box, Typography } from "@mui/material";
import SesionTrabajoItem from "./SesionTrabajoItem";

function SesionesTrabajoList({ sesiones, onFinalizar, userId }: any) {
  if (!sesiones || sesiones.length === 0) {
    return <Typography>No hay sesiones de trabajo.</Typography>;
  }

  return (
    <Box mt={4} maxWidth="600px" margin="0 auto">
      <Typography variant="h5" gutterBottom textAlign={"center"}>
        Sesiones de Trabajo
      </Typography>
      {sesiones.map((sesion: any) => (
        <SesionTrabajoItem
          key={sesion.idSesionTrabajo}
          sesion={sesion}
          onFinalizar={onFinalizar}
          userId={userId}
        />
      ))}
    </Box>
  );
}

export default SesionesTrabajoList;
