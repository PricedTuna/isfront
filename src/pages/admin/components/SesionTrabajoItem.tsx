import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function SesionTrabajoItem({ sesion, onFinalizar, userId }: any) {
  return (
    <Box
      key={sesion.idSesionTrabajo}
      p={2}
      mb={2}
      border="1px solid #ccc"
      borderRadius="4px"
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Typography variant="body1">
        <strong>Token:</strong> {sesion.sesionToken}
      </Typography>
      <Typography variant="body1">
        <strong>Fecha de Creación:</strong>{" "}
        {new Date(sesion.createDate).toLocaleDateString()}
      </Typography>
      <Typography variant="body1">
        <strong>Fecha de Finalización:</strong>{" "}
        {sesion.finalizedDate
          ? new Date(sesion.finalizedDate).toLocaleDateString()
          : "En curso"}
      </Typography>
      <Box
        mt={2}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Button
          component={Link}
          to={`/admin/sesionTrabajo/${sesion.idSesionTrabajo}`}
          variant="contained"
          color="primary"
        >
          Ver Detalles
        </Button>
        {!sesion.finalizedDate && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => onFinalizar(sesion.idSesionTrabajo, userId)}
          >
            Finalizar Sesión
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default SesionTrabajoItem;
