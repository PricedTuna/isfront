import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router";

function AdminPage() {
  return (
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2">
        Admin panel
      </Typography>
      {Outlet !== null && Outlet !== undefined ? (
        <Outlet />  
      ) : (
        <Box>
          <Typography>Aqui se muestra info del panel :p</Typography>
        </Box>
      )}
    </Box>
  );
}

export default AdminPage;
