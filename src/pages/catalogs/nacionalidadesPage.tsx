
import { Box, Typography, Button } from '@mui/material'
import { Link, Outlet, useLocation } from "react-router-dom";
function NacionalidadesPage() {
  const location = useLocation();
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontFamily={"Oswald"}>
        Administracion de Nacionalides 
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} mt={4} marginBottom={10}>
        <Box>
          <Link to="crear">
            <Button
              variant={
                location.pathname === "/admin/nacionalides/crear" ? "contained" : "outlined"
              }
            >
              Dar de alta nacionalidad
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="">
            <Button
              variant={
                location.pathname === "/admin/nacionalidades" ? "contained" : "outlined"
              }
            >
              Listar Nacionalidades
            </Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}

export default NacionalidadesPage
