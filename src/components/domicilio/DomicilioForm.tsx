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
import { GetDomicilioDto } from "../../dtos/domicilios/GetDomicilioDto";
import useGetDomicilio from "../../pages/admin/domicilios/hooks/use-get-domicilios";
import { DomicilioService } from "../../services/DomicilioService";

interface DomicilioFormValues {
  idPais: number;
  idEstado: number;
  idMunicipio: number;
  idCiudad: number;
  colonia: string;
  cp: string;
  numero: string;
}

export default function DomicilioForm() {
  const _domicilioService = new DomicilioService();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    paisOptions,
    estadoOptions,
    municipioOptions,
    ciudadOptions,
    fetchPaises,
    fetchEstados,
    fetchMunicipios,
    fetchCiudades,
  } = useGetDomicilio();
  const [formValues, setFormValues] = useState<DomicilioFormValues>({
    idPais: 0,
    idEstado: 0,
    idMunicipio: 0,
    idCiudad: 0,
    colonia: "",
    cp: "",
    numero: "",
  });

  const [loading, setLoading] = useState(true);
  const initialValues = location.state as GetDomicilioDto | null;

  useEffect(() => {
    const loadInitialData = async () => {
      console.log("Cargando países...");
      await fetchPaises(); // Cargar países primero
      
      if (initialValues) {
        const { idPais, idEstado, idMunicipio, idCiudad, colonia, cp, numero } = initialValues;
  
        console.log("Cargando estados para idPais:", idPais);
        await fetchEstados(idPais);
  
        console.log("Cargando municipios para idEstado:", idEstado);
        await fetchMunicipios(idEstado);
  
        console.log("Cargando ciudades para idMunicipio:", idMunicipio);
        await fetchCiudades(idMunicipio);
  
        setFormValues({
          idPais,
          idEstado,
          idMunicipio,
          idCiudad,
          colonia: colonia || "",
          cp: cp || "",
          numero: numero || "",
        });
      }
  
      setLoading(false);
    };
  
    loadInitialData();
  }, [initialValues, fetchPaises, fetchEstados, fetchMunicipios, fetchCiudades]);
  
  const handleFieldChange = async (field: keyof DomicilioFormValues, value: number) => {
    const updatedFormValues: DomicilioFormValues = { ...formValues, [field]: value };
  
    switch (field) {
      case "idPais":
        updatedFormValues.idEstado = 0; // Reinicia dependencias
        updatedFormValues.idMunicipio = 0;
        updatedFormValues.idCiudad = 0;
        await fetchEstados(value); // Carga estados para el nuevo país
        break;
      case "idEstado":
        updatedFormValues.idMunicipio = 0;
        updatedFormValues.idCiudad = 0;
        await fetchMunicipios(value); // Carga municipios para el nuevo estado
        break;
      case "idMunicipio":
        updatedFormValues.idCiudad = 0;
        await fetchCiudades(value); // Carga ciudades para el nuevo municipio
        break;
    }
  
    setFormValues(updatedFormValues);
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
  
    if (!formValues.idPais || !formValues.idEstado || !formValues.idMunicipio || !formValues.idCiudad) {
      await showErrorAlert(
        "Por favor, completa todos los campos requeridos.",
        prefersDarkMode
      );
      return;
    }
  
    try {
      const action = initialValues
        ? "actualizado correctamente"
        : "registrado correctamente";
  
      if (initialValues) {
        await _domicilioService.update(initialValues.idDomicilio, formValues);
      } else {
        await _domicilioService.create(formValues);
      }
  
      await showSuccessAlert(`El domicilio fue ${action}.`, prefersDarkMode);
      navigate("/admin/domicilio");
    } catch (error) {
      await showErrorAlert(
        "Hubo un problema al procesar la solicitud. Inténtalo de nuevo.",
        prefersDarkMode
      );
      console.error("Error en el registro/actualización de domicilio:", error);
    }
  };
  
  
  if (loading || paisOptions.length === 0) {
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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
      <h2>{initialValues ? "Editar Domicilio" : "Registrar Domicilio"}</h2>

      <TextField
        select
        label="País"
        value={formValues.idPais || ""}
        onChange={(e) => handleFieldChange("idPais", Number(e.target.value))}
        fullWidth
        required
        
      >
        {paisOptions.length === 0 ? (
          <MenuItem disabled value="">
            No hay opciones disponibles
          </MenuItem>
        ) : (
          paisOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        select
        label="Estado"
        value={formValues.idEstado || ""}
        onChange={(e) => handleFieldChange("idEstado", Number(e.target.value))}
        fullWidth
        required
        disabled={!formValues.idPais}
        sx={{marginTop:4}}
      >
        {estadoOptions.length === 0 ? (
          <MenuItem disabled value="">
            No hay opciones disponibles
          </MenuItem>
        ) : (
          estadoOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        select
        label="Municipio"
        value={formValues.idMunicipio || ""}
        onChange={(e) => handleFieldChange("idMunicipio", Number(e.target.value))}
        fullWidth
        required
        disabled={!formValues.idEstado}
        sx={{marginTop:4}}
      >
        {municipioOptions.length === 0 ? (
          <MenuItem disabled value="">
            No hay opciones disponibles
          </MenuItem>
        ) : (
          municipioOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        select
        label="Ciudad"
        value={formValues.idCiudad || ""}
        onChange={(e) => handleFieldChange("idCiudad", Number(e.target.value))}
        fullWidth
        required
        disabled={!formValues.idMunicipio}
        sx={{marginTop:4}}
      >
        {ciudadOptions.length === 0 ? (
          <MenuItem disabled value="">
            No hay opciones disponibles
          </MenuItem>
        ) : (
          ciudadOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))
        )}
      </TextField>

      <TextField
        label="Colonia"
        value={formValues.colonia}
        onChange={(e) => setFormValues({ ...formValues, colonia: e.target.value })}
        fullWidth
        required
        sx={{marginTop:4}}
      />

      <TextField
        label="Código Postal"
        value={formValues.cp}
        onChange={(e) => setFormValues({ ...formValues, cp: e.target.value })}
        fullWidth
        required
        sx={{marginTop:4}}
      />

      <TextField
        label="Número"
        value={formValues.numero}
        onChange={(e) => setFormValues({ ...formValues, numero: e.target.value })}
        fullWidth
        required
        sx={{marginTop:4,marginBottom:4}}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {initialValues ? "Actualizar Domicilio" : "Registrar Domicilio"}
      </Button>
    </Box>
  );
}
