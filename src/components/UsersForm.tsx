import { Container, Box, TextField, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

function UsersForm() {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(event.target.checked);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography variant="h4" component="h1" gutterBottom fontFamily="Oswald" fontSize={50}>
          Registro de Usuarios
        </Typography>
        <Box component="form" width="100%">
          <TextField
            label="Nombre del Usuario"
            name="nombreUser"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
          />
          <TextField
            label="Correo"
            name="correoUser"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
          />
          <TextField
            label="Contraseña"
            name="passwordUser"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            type="password"
            InputProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
          />
          <TextField
            label="Número de empleado"
            name="numeroEmpleado"
            variant="outlined"
            fullWidth
            margin="dense"
            required
            
            InputProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
            InputLabelProps={{
              style: { fontSize: "1.5rem", fontFamily:"Rubik" },
            }}
          />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={handleCheckboxChange}
                  color="primary"
                  size="large"
                />
              }
              label="Es Administrador"
              componentsProps={{
                typography: {
                  style: {
                    fontSize: "1.5rem", // Cambia el tamaño de la fuente
                    fontFamily: "Rubik", // Cambia la familia de la fuente
                  },
                },
              }}
            />

                    <Button
            type="submit"ss
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2, fontSize: "1.5rem",fontFamily:"Rubik" }} // Cambia el tamaño del texto del botón
          >
            Registrar Usuario
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default UsersForm;
