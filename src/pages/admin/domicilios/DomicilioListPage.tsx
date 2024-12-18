import { Container, Box } from "@mui/material";
import DomiciliosList from "../../../components/domicilio/DomicilioList";

function DomicilioListPage() {
  return (
    <Container maxWidth="sm">
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
        <DomiciliosList/>
    </Box>
    </Container>
  )
}

export default DomicilioListPage
