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
import { CreateEmpleadoDto, UpdateEmpleadoDto } from "../../dtos/empleado/CreateEmpleadodto";
import useGetDomicilio from "../../pages/admin/domicilios/hooks/use-get-domicilios";
import useGetSucursal from "../../pages/admin/sucursales/hooks/use-get-sucursales";
import useGetNationalities from "../../pages/catalogs/hooks/use-get-nacionalidad";
import useGetEmpleado from "../../pages/admin/empleado/hooks/use-get-empleado";
import { EmpleadoService } from "../../services/EmpleadoService";
import { EmpleadoDto } from "../../dtos/empleado/GetEmpleadoDto";

export default function EmpleadoForm() {
  const _empleadoService = new EmpleadoService();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const location = useLocation();

  const { domicilios, fetchDomicilios } = useGetDomicilio();
  const { sucursales, fetchSucursales } = useGetSucursal();
  const {
    estadoCivilOptions,
    departamentoOptions,
    puestoOptions,
    tipoEmpleadoOptions,
    diasVacacionesOptions,
    fetchEstadosCiviles,
    fetchDepartamentos,
    fetchPuestos,
    fetchTiposEmpleado,
    fetchDiasVacaciones,
  } = useGetEmpleado();

  const { nationalities, fetchNationalities } = useGetNationalities();

  const [loading, setLoading] = useState(true);
  const initialValues = location.state as UpdateEmpleadoDto | null;

  const [formValues, setFormValues] = useState<CreateEmpleadoDto | UpdateEmpleadoDto>(
    initialValues ?? {
      nombreEmpleado: "",
      curp: "",
      rfc: "",
      nss: "",
      emailLaboral: "",
      emailPersonal: "",
      numCelLaboral: "",
      numCelPersonal: "",
      registroPatronal: "",
      fechaNacimiento: new Date(),
      lugarNacimiento: "",
      idNacionalidad: 0,
      idDomicilio: 0,
      idEstadoCivil: 0,
      idSucursal: 0,
      idDepartamento: 0,
      idPuesto: 0,
      idTipoEmpleado: 0,
      idDiasVacaciones: 0,
      estatus: "Activo",
    }
  );

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([
        fetchDomicilios(),
        fetchSucursales(),
        fetchEstadosCiviles(),
        fetchDepartamentos(),
        fetchPuestos(),
        fetchTiposEmpleado(),
        fetchDiasVacaciones(),
        fetchNationalities(),
      ]);

      if (initialValues) {
        setFormValues(initialValues);
      }
      setLoading(false);
    };

    loadInitialData();
  }, [
    fetchDomicilios,
    fetchSucursales,
    fetchEstadosCiviles,
    fetchDepartamentos,
    fetchPuestos,
    fetchTiposEmpleado,
    fetchDiasVacaciones,
    fetchNationalities,
    initialValues,
  ]);

  const handleFieldChange = <T extends keyof (CreateEmpleadoDto | UpdateEmpleadoDto)>(
    field: T,
    value: CreateEmpleadoDto[T] | UpdateEmpleadoDto[T]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requiredFields: (keyof CreateEmpleadoDto)[] = [
      "nombreEmpleado",
      "curp",
      "idSucursal",
      "idDomicilio",
    ];
    const missingField = requiredFields.find((field) => !formValues[field]);

    if (missingField) {
      await showErrorAlert("Por favor, completa todos los campos requeridos.", prefersDarkMode);
      return;
    }

    try {
      if (initialValues && "idEmpleado" in initialValues) {
        await _empleadoService.updateEmpleado(initialValues.idEmpleado, {
          ...formValues,
          idEmpleado: initialValues.idEmpleado,
        } as UpdateEmpleadoDto);
      } else {
        await _empleadoService.createEmpleado(formValues as EmpleadoDto);
      }

      await showSuccessAlert(
        `El empleado fue ${initialValues ? "actualizado" : "registrado"} correctamente.`,
        prefersDarkMode
      );
      navigate("/admin/empleados");
    } catch (error) {
      await showErrorAlert("Hubo un problema al procesar la solicitud.", prefersDarkMode);
      console.error("Error:", error);
    }
  };

  if (loading || !domicilios || !sucursales) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
      <h2>{initialValues ? "Editar Empleado" : "Registrar Empleado"}</h2>

      <TextField
        label="Nombre del Empleado"
        value={formValues.nombreEmpleado}
        onChange={(e) => handleFieldChange("nombreEmpleado", e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="CURP"
        value={formValues.curp}
        onChange={(e) => handleFieldChange("curp", e.target.value)}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RFC"
        value={formValues.rfc}
        onChange={(e) => handleFieldChange("rfc", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Número de Seguridad Social (NSS)"
        value={formValues.nss}
        onChange={(e) => handleFieldChange("nss", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Correo Laboral"
        type="email"
        value={formValues.emailLaboral}
        onChange={(e) => handleFieldChange("emailLaboral", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Correo Personal"
        type="email"
        value={formValues.emailPersonal}
        onChange={(e) => handleFieldChange("emailPersonal", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Teléfono Laboral"
        value={formValues.numCelLaboral}
        onChange={(e) => handleFieldChange("numCelLaboral", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Teléfono Personal"
        value={formValues.numCelPersonal}
        onChange={(e) => handleFieldChange("numCelPersonal", e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        select
        label="Nacionalidad"
        value={formValues.idNacionalidad}
        onChange={(e) => handleFieldChange("idNacionalidad", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      >
        {nationalities.map((nac) => (
          <MenuItem key={nac.idNacionalidad} value={nac.idNacionalidad}>
            {nac.nacionalidad}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Estado Civil"
        value={formValues.idEstadoCivil}
        onChange={(e) => handleFieldChange("idEstadoCivil", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      >
        {estadoCivilOptions.map((estado) => (
          <MenuItem key={estado.id} value={estado.id}>
            {estado.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Departamento"
        value={formValues.idDepartamento}
        onChange={(e) => handleFieldChange("idDepartamento", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      >
        {departamentoOptions.map((dep) => (
          <MenuItem key={dep.id} value={dep.id}>
            {dep.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Puesto"
        value={formValues.idPuesto}
        onChange={(e) => handleFieldChange("idPuesto", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      >
        {puestoOptions.map((puesto) => (
          <MenuItem key={puesto.id} value={puesto.id}>
            {puesto.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Tipo de Empleado"
        value={formValues.idTipoEmpleado}
        onChange={(e) => handleFieldChange("idTipoEmpleado", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      >
        {tipoEmpleadoOptions.map((tipo) => (
          <MenuItem key={tipo.id} value={tipo.id}>
            {tipo.nombre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Días de Vacaciones"
        value={formValues.idDiasVacaciones}
        onChange={(e) => handleFieldChange("idDiasVacaciones", Number(e.target.value))}
        fullWidth
        required
        sx={{ marginBottom: 2 }}
      >
        {diasVacacionesOptions.map((dias) => (
          <MenuItem key={dias.id} value={dias.id}>
            {dias.dias}
          </MenuItem>
        ))}
      </TextField>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {initialValues ? "Actualizar Empleado" : "Registrar Empleado"}
      </Button>
    </Box>
  );
}
