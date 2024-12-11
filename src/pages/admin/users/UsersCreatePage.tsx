import { Container, Box } from "@mui/material";
import UsersForm from '../../../components/UsersForm';

function UsersCreatePage() {
  return (
    <Container maxWidth="sm">
    <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh">
        <UsersForm/>
    </Box>
    </Container>
  )
}

export default UsersCreatePage
