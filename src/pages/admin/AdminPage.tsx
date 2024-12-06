import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

function AdminPage() {

  const navigate = useNavigate();


  return (
    
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2">
        Admin panel
      </Typography>
      <Box display='flex' justifyContent='center' alignItems='center' marginTop={5} >
        <Button onClick={() => navigate('users')} variant="outlined">
          Agregar un usuario
        </Button>
      </Box>
    </Box>
    
  );
}

export default AdminPage;
