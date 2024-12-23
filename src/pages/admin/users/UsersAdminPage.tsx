import { Box, Button, Typography} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";



function UsersAdminPage() {
  const location = useLocation(); // Obtener la ubicación actuals


  return (
   
    <Box>
      <Typography variant="h3" textAlign="center" fontFamily={"Oswald"} fontSize={50}>
        Administracion de Usuarios 
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} mt={4}>
        <Box>
          <Link to="crear">
            <Button
              variant={
                location.pathname === "/admin/users/create" ? "contained" : "outlined"
              }
            >
              Crear Usuario
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="">
            <Button
              variant={
                location.pathname === "/admin/users" ? "contained" : "outlined"
              }
            >
              Listar Usuarios
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

export default UsersAdminPage;