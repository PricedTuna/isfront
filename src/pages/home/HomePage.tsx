import { Box, Typography } from "@mui/material";

function HomePage() {
  return (
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2" fontFamily={"Oswald"}>
        Home page
      </Typography>
      <Box>
        <Typography textAlign="center" py={2} variant="h4" fontFamily={"Rubik"}>
          Aqui se muestra información sobre tus datos :p
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
