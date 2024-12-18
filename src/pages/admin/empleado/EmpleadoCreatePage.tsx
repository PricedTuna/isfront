import { Container, Box } from "@mui/material";
import EmpleadoForm from "../../../components/empleado/EmpleadoForm";

function EmpleadoCreatePage() {
  return (
    <Container maxWidth="sm">
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
        <EmpleadoForm/>
    </Box>
    </Container>
  )
}

export default EmpleadoCreatePage
