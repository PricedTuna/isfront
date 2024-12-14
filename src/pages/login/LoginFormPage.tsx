import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../common/context/AuthContext";
import { AuthService } from "../../services/AuthService";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const _userService = new AuthService();
  //Tonos para boton

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginResponse = await _userService.login({
      correo: email,
      password: password,
    });

    if (loginResponse !== null) {
      const { accessToken, user: userFound } = loginResponse;

      // Guardar en localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(userFound));

      // Actualizar el contexto
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
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontFamily={"Oswald"}
          fontSize={50}
        >
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            error={isEmailError}
            label="Correo electrónico"
            variant="filled"
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
            variant="filled"
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
