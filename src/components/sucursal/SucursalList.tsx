import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { SucursalDto } from "../../dtos/sucursales/SucursalDto";
import { SucursalService } from "../../services/SucursalService";
import GenericList from "../../components/List";
import { useEffect, useState } from "react";

const SucursalesList = () => {
  const navigate = useNavigate();
  const _sucursalService = new SucursalService();

  const [sucursales, setSucursales] = useState<SucursalDto[] | undefined>(undefined);

  // Cargar las sucursales
  const fetchSucursales = async () => {
    try {
      const response = await _sucursalService.getAll();
      setSucursales(Array.isArray(response) ? response as SucursalDto[] : []);
    } catch (error) {
      console.error("Error al cargar sucursales:", error);
      setSucursales([]);
    }
  };

  useEffect(() => {
    fetchSucursales();
  }, []);

  const handleEdit = (sucursal: SucursalDto) => {
    navigate("/admin/sucursal/crear", { state: sucursal }); // Navega a la página de creación/edición
  };

  const handleDelete = async (id: number) => {
    try {
      await _sucursalService.delete(id);
      fetchSucursales(); // Recargar lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar sucursal:", error);
    }
  };

  return (
    <Box mt={4} gap={2}>
      {sucursales === undefined ? (
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
          <GenericList<SucursalDto>
            title="Listado de Sucursales"
            items={sucursales}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filterKeys={["nombreSucursal", "numTelefono"]} // Campos para búsqueda
            getItemId={(sucursal) => sucursal.idSucursal} // ID único
            getItemLabel={(sucursal) =>
              `Nombre Sucursal: ${sucursal.nombreSucursal} 
              Tel: ${sucursal.numTelefono}`
            } // Etiqueta del ítem
          />
        </Box>
      )}
    </Box>
  );
};

export default SucursalesList;
