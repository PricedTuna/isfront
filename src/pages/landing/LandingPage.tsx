import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box
      m={0}
      p={0}
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h1" mb={4} p={0} textAlign={"center"} >
        Sistema de Recursos humanos
      </Typography>
      <Link to="login">
        <Button variant="outlined" size="large">
          <Typography variant="h6">Iniciar sesión</Typography>
        </Button>
      </Link>
    </Box>
  );
}

export default LandingPage;
