import { Box, Button, Typography} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
function TipoContratoPage() {
 
    const location = useLocation(); // Obtener la ubicación actuals


  return (
   
    <Box>
      <Typography variant="h3" textAlign="center" fontFamily={"Oswald"} fontSize={50}>
        Administracion de Tipos de Contrato 
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} mt={4}>
        <Box>
          <Link to="crear">
            <Button
              variant={
                location.pathname === "/admin/tipocontrato/crear" ? "contained" : "outlined"
              }
            >
              Crear Tipos de Contrato
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="">
            <Button
              variant={
                location.pathname === "/admin/tipocontrato" ? "contained" : "outlined"
              }
            >
              Listar Tipos de Contrato
            </Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
   
  );
}

export default TipoContratoPage
