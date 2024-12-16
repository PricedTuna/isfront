import SucursalForm from "../../../components/sucursal/SucursalForm"
import { Container, Box } from "@mui/material";
function SucursalCreatePage() {
  return (
    <Container maxWidth="sm">
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
        <SucursalForm/>
    </Box>
    </Container>
  )
}

export default SucursalCreatePage
