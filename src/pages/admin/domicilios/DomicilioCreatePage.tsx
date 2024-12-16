import { Container, Box } from "@mui/material";
import DomicilioForm from "../../../components/domicilio/DomicilioForm";

function DomicilioCreatePage() {
  return (
    <Container maxWidth="sm">
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
        <DomicilioForm/>
    </Box>
    </Container>
  )
}

export default DomicilioCreatePage
