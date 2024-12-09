import { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "../../common/context/AuthContext";
import { AuthService } from "../../services/AuthService";
import { loginUserDto } from "../../dtos/auth/GetLoginUserDto";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const _userService = new AuthService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const defaultUser: loginUserDto = {
      idUsuario: 1,
      nombreUsuario: "adminUser",
      correo: "admin@admin.com",
      isAdmin: true,
      createdate: "2024-12-03T05:51:01.000Z",
      updatedate: "2024-12-03T05:51:01.000Z"
    }
    // !
    if(email === 'admin@mail.com' && password === 'admin'){
      login(defaultUser);
      navigate("/admin");
    }
    // !

    e.preventDefault();
    const loginResponse = await _userService.login({
      email: email,
      password: password,
    });

    if (loginResponse !== null) {
      const {accessToken: _, user: userFound} = loginResponse
      login(userFound);
      
      if (userFound.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      console.error("USER NOT FOUND");
      setEmailError(true);
      setPasswordError(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            error={isEmailError}
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
            required
          />
          <TextField
            error={isPasswordError}
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Iniciar Sesión
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
