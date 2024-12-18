import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { EmpleadoDto } from "../../dtos/empleado/GetEmpleadoDto";
import { EmpleadoService } from "../../services/EmpleadoService";
import GenericList from "../../components/List";
import { useEffect, useState } from "react";

const EmpleadosList = () => {
  const navigate = useNavigate();
  const _empleadoService = new EmpleadoService();

  const [empleados, setEmpleados] = useState<EmpleadoDto[] | undefined>(undefined);

  // Cargar los empleados
  const fetchEmpleados = async () => {
    try {
      const response = await _empleadoService.getAllEmpleados();
      setEmpleados(Array.isArray(response) ? response as EmpleadoDto[] : []);
    } catch (error) {
      console.error("Error al cargar empleados:", error);
      setEmpleados([]);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleEdit = (empleado: EmpleadoDto) => {
    navigate("/admin/empleado/crear", { state: empleado }); // Navega a la página de creación/edición
  };

  const handleDelete = async (id: number) => {
    try {
      await _empleadoService.deleteEmpleado(id);
      fetchEmpleados(); // Recargar lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
    }
  };

  return (
    <Box mt={4} gap={2}>
      {empleados === undefined ? (
        <Box display="flex" justifyContent="center" minHeight="100vh">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          maxWidth="100%" // Ancho máximo de la caja
          margin="0 auto" // Centrar el contenido horizontalmente
          padding="16px" // Espaciado interno
        >
          <GenericList<EmpleadoDto>
            title="Listado de Empleados"
            items={empleados}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filterKeys={["nombreEmpleado", "emailLaboral", "numCelPersonal","curp","nss","rfc"]} // Campos para búsqueda
            getItemId={(empleado) => empleado.idEmpleado} // ID único
            getItemLabel={(empleado) =>
              `Nombre: ${empleado.nombreEmpleado} | Email: ${empleado.emailLaboral} | Tel: ${empleado.numCelPersonal}`
            } // Etiqueta del ítem
          />
        </Box>
      )}
    </Box>
  );
};

export default EmpleadosList;
