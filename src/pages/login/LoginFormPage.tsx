import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

import { useNavigate } from "react-router";
import { useAuth } from "../../common/context/AuthContext";
import { AuthError, AuthService } from "../../services/AuthService";
import { showErrorAlert } from "../../utils/AlertUtils";

function LoginForm() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // Estado para controlar la visibilidad de la contraseña

  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const _userService = new AuthService();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const loginResponse = await _userService.login({
        correo: email,
        password: password,
      });

      if (loginResponse !== null) {
        const { accessToken, user: userFound } = loginResponse;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(userFound));

        login(userFound);

        if (userFound.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        handleUserNotFound();
      }
    } catch (error: any) {
      if (error.message === AuthError.Unauthorized) {
        handleUserNotFound();
      } else {
        console.error("Login error:", error);
        alert("Ha ocurrido un error, por favor inténtalo nuevamente.");
      }
    }
  };

  const handleUserNotFound = () => {
    console.error("USER NOT FOUND");
    setEmailError(true);
    setPasswordError(true);
    showErrorAlert("Usuario no encontrado, verifique su correo y contraseña", prefersDarkMode);
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
            type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
