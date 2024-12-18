import { Container, Box } from "@mui/material";
import AutosForm from "../../../components/AutosForm";

function AutoCreatePage() {


  return (
    <Container maxWidth="sm">
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
       <AutosForm/>
    </Box>
    </Container>
  );
}

export default AutoCreatePage;
