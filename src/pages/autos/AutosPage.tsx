import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AutoService } from "../../services/AutoService";
import { Auto } from "../../dtos/autos/AutoDto";

function AutosPage() {
  const [autos, setAutos] = useState<Auto[]>();
  const _autoService = new AutoService();

  useEffect(() => {
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

    fetchAutos();
  }, []);

  return (
    <Box>
      <Typography variant="h3">This is the main autos page!!</Typography>
      <Box display="flex" justifyContent="space-evenly" >
        <Link to="crear">
          <Button variant="contained">Create new Car</Button>
        </Link>
        <Link to="">
          <Button variant="contained">List</Button>
        </Link>
      </Box>
      <Box>
        <Outlet context={{ autos }} />
      </Box>
    </Box>
  );
}

export default AutosPage;
