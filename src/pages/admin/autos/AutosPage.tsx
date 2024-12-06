import { Box, Button, Typography} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

function AutosPage() {
  const location = useLocation(); // Obtener la ubicación actuals


  return (
   
    <Box>
      <Typography variant="h3" textAlign="center">
        Autos admin panel
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} mt={4}>
        <Box>
          <Link to="crear">
            <Button
              variant={
                location.pathname === "/admin/autos/crear" ? "contained" : "outlined"
              }
            >
              Dar de alta Auto
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="">
            <Button
              variant={
                location.pathname === "/admin/autos" ? "contained" : "outlined"
              }
            >
              Listar autos
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

export default AutosPage;
