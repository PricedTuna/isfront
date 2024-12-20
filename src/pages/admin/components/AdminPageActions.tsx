import { Box, Button } from "@mui/material";

function AdminPageActions({ onIniciarSesion, onExportarSesion }: any) {
  return (
    <Box display="flex" justifyContent="center" gap={3} mt={4} mb={5}>
      <Box display="flex" flexDirection={"column"} gap={1}>
        <Button variant="contained" onClick={onIniciarSesion}>
          Iniciar una sesion de trabajo
        </Button>
        <Button variant="contained" onClick={onExportarSesion}>
          Exportar sesiones a Excel
        </Button>
      </Box>
    </Box>
  );
}

export default AdminPageActions;
