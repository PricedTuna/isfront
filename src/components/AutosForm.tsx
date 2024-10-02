import { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { AutoService } from "../services/AutoService";
import { CreateAutoDto } from "../dtos/autos/CreateAutoDto";

interface AutosFormProps extends Partial<CreateAutoDto> {}

function AutosForm({
  fechaCompra = "",
  nombreModelo = "",
  numeroPlacas = "",
  numeroPoliza = "",
  numeroSerie = "",
  ordenRegistro = "",
  vencimientoPoliza = "",
  yearModelo = ""
}: AutosFormProps ) {

  const autoService = new AutoService()

  const [formValues, setFormValues] = useState<CreateAutoDto>({
    nombreModelo,
    yearModelo,
    ordenRegistro,
    fechaCompra,
    numeroPlacas,
    numeroSerie,
    numeroPoliza,
    vencimientoPoliza,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    const response = await autoService.create(formValues);
    console.log(response);
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
        <Typography variant="h4" component="h1" gutterBottom>
          Registro de Auto
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Nombre Modelo"
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

export default AutosForm;
