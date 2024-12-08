import { useState } from "react";
import { Container, Box, TextField, Button, Typography,useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Auto } from "../../../dtos/autos/AutoDto";
import { AutoService } from "../../../services/AutoService";
import { CreateAutoDto } from "../../../dtos/autos/CreateAutoDto";
import useGetAutos from "./hooks/use-get-autos";
import { showSuccessAlert,showErrorAlert } from "../../../utils/AlertUtils";



function AutoCreatePage() {
  const location = useLocation(); // Recupera la ubicación actual
  const initialValues = location.state as Auto; // Cast a CreateAutoDto
  const navigate = useNavigate();
  const { fetchAutos } = useGetAutos();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const autoService = new AutoService();

  const [formValues, setFormValues] = useState<CreateAutoDto>({
    nombreModelo: initialValues?.nombreModelo || "",
    yearModelo: initialValues?.yearModelo || "",
    ordenRegistro: initialValues?.ordenRegistro || "",
    fechaCompra: initialValues?.fechaCompra || "",
    numeroPlacas: initialValues?.numeroPlacas || "",
    numeroSerie: initialValues?.numeroSerie || "",
    numeroPoliza: initialValues?.numeroPoliza || "",
    vencimientoPoliza: initialValues?.vencimientoPoliza || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (initialValues != null) {
        await autoService.update(initialValues.idAuto, formValues);
        await showSuccessAlert("El auto fue actualizado correctamente.", prefersDarkMode);
      } else {
        await autoService.create(formValues);
        await showSuccessAlert("El auto fue registrado correctamente.", prefersDarkMode);
      }
      fetchAutos();
      navigate("/admin/autos");
    } catch (error) {
      await showErrorAlert("Hubo un problema al procesar la solicitud. Inténtalo de nuevo.", prefersDarkMode);
      console.error("Error en el registro/actualización:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom fontFamily={"Oswald"}>
          Registro de Auto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Modelo"
            name="nombreModelo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.nombreModelo}
            onChange={handleChange}
            required
          />
          <TextField
            label="Año Modelo"
            name="yearModelo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.yearModelo}
            onChange={handleChange}
            required
          />
          <TextField
            label="Orden Registro"
            name="ordenRegistro"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.ordenRegistro}
            onChange={handleChange}
            required
          />
          <TextField
            label="Fecha de Compra"
            name="fechaCompra"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formValues.fechaCompra}
            onChange={handleChange}
            required
          />
          <TextField
            label="Número de Placas"
            name="numeroPlacas"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.numeroPlacas}
            onChange={handleChange}
            required
          />
          <TextField
            label="Número de Serie"
            name="numeroSerie"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.numeroSerie}
            onChange={handleChange}
            required
          />
          <TextField
            label="Número de Póliza"
            name="numeroPoliza"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formValues.numeroPoliza}
            onChange={handleChange}
            required
          />
          <TextField
            label="Vencimiento Póliza"
            name="vencimientoPoliza"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formValues.vencimientoPoliza}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Registrar Auto
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AutoCreatePage;
