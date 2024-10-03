import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AutoService } from "../../services/AutoService";
import { Auto } from "../../dtos/autos/AutoDto";

function AutosPage() {
  const [autos, setAutos] = useState<Auto[]>();
  const _autoService = new AutoService();
  const location = useLocation(); // Obtener la ubicación actual

  const fetchAutos = async () => {
    try {
      const response = await _autoService.getAll();
      if (Array.isArray(response)) {
        setAutos(response);
      }
    } catch (error) {
      console.error("Error fetching autos:", error);
    }
  };

  useEffect(() => {
    fetchAutos();
  }, []);

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
                location.pathname === "/autos/crear" ? "contained" : "outlined"
              } // Cambiar a "contained" si la ruta está activa
            >
              Dar de alta Auto
            </Button>
          </Link>
        </Box>
        <Box>
          <Link to="">
            <Button
              variant={
                location.pathname === "/autos" ? "contained" : "outlined"
              } // Cambiar a "contained" si la ruta está activa
            >
              Listar autos
            </Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Outlet context={{ autos }} />
      </Box>
    </Box>
  );
}

export default AutosPage;
