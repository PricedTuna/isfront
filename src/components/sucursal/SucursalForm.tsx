import { useState, useEffect } from "react";
import {
  showSuccessAlert,
  showErrorAlert,
} from "../../utils/AlertUtils";
import {
  useMediaQuery,
  MenuItem,
  TextField,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {  CreateSucursalDto } from "../../dtos/sucursales/CreateSucursalDto";
import { SucursalDto } from "../../dtos/sucursales/SucursalDto";
import useGetDomicilio from "../../pages/admin/domicilios/hooks/use-get-domicilios";
import { SucursalService } from "../../services/SucursalService";

interface SucursalFormValues {
  idDomicilio: number;
  nombreSucursal: string;
  numTelefono: string;
}

export default function SucursalForm() {
  const _sucursalService = new SucursalService();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const location = useLocation();
  const { domicilios, fetchDomicilios } = useGetDomicilio();
  const [formValues, setFormValues] = useState<SucursalFormValues>({
    idDomicilio: 0,
    nombreSucursal: "",
    numTelefono: "",
  });

  const [loading, setLoading] = useState(true);
  const initialValues = location.state as SucursalDto | null;

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchDomicilios();
      if (initialValues) {
        const { idDomicilio, nombreSucursal, numTelefono } = initialValues;
        setFormValues({ idDomicilio, nombreSucursal, numTelefono });
      }
      setLoading(false);
    };

    loadInitialData();
  }, [initialValues, fetchDomicilios]);

  const handleFieldChange = (field: keyof SucursalFormValues, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.nombreSucursal || !formValues.idDomicilio || !formValues.numTelefono) {
      await showErrorAlert(
        "Por favor, completa todos los campos requeridos.",
        prefersDarkMode
      );
      return;
    }

    try {
      const action = initialValues
        ? "actualizada correctamente"
        : "registrada correctamente";

      const data: CreateSucursalDto = {
        nombreSucursal: formValues.nombreSucursal,
        idDomicilio: formValues.idDomicilio,
        numTelefono: formValues.numTelefono,
      };

      if (initialValues) {
        await _sucursalService.update(initialValues.idSucursal, data); // Actualizar
      } else {
        await _sucursalService.create(data); // Crear
      }

      await showSuccessAlert(`La sucursal fue ${action}.`, prefersDarkMode);
      navigate("/admin/sucursal/crear");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el registro/actualización de sucursal:", error);
    }
  };

  if (loading || !domicilios) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, mx: "auto", mt: 2 }}
    >
      <h2>{initialValues ? "Editar Sucursal" : "Registrar Sucursal"}</h2>

      <TextField
        select
        label="Domicilio"
        value={formValues.idDomicilio || ""}
        onChange={(e) => handleFieldChange("idDomicilio", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 4 }}
      >
        {domicilios.length === 0 ? (
          <MenuItem disabled value="">
            No hay domicilios disponibles
          </MenuItem>
        ) : (
          domicilios.map((domicilio) => (
            <MenuItem key={domicilio.idDomicilio} value={domicilio.idDomicilio}>
              {`${domicilio.colonia}, ${domicilio.numero}, CP ${domicilio.cp}`}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        label="Nombre de la Sucursal"
        value={formValues.nombreSucursal}
        onChange={(e) => handleFieldChange("nombreSucursal", e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 4 }}
      />

      <TextField
        label="Número de Teléfono"
        value={formValues.numTelefono}
        onChange={(e) => handleFieldChange("numTelefono", e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 4 }}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {initialValues ? "Actualizar Sucursal" : "Registrar Sucursal"}
      </Button>
    </Box>
  );
}
