import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { GetDomicilioDto } from "../../dtos/domicilios/GetDomicilioDto";
import { DomicilioService } from "../../services/DomicilioService";
import GenericList from "../../components/List";
import useGetDomicilio from "../../pages/admin/domicilios/hooks/use-get-domicilios";
import { useEffect } from "react";

const DomiciliosList = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const _domicilioService = new DomicilioService();

  const { domicilios, fetchDomicilios } = useGetDomicilio();

  useEffect(() => {
    fetchDomicilios();
  }, [fetchDomicilios]);

  const handleEdit = (domicilio: GetDomicilioDto) => {
    navigate("/admin/domicilio/crear", { state: domicilio }); // Navega a la página de creación y pasa el domicilio como estado
  };

  const handleDelete = async (id: number) => {
    try {
      await _domicilioService.delete(id);
      fetchDomicilios(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar domicilio:", error);
    }
  };

  return (
    <Box mt={4} gap={2}>
      {domicilios === undefined ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <GenericList<GetDomicilioDto>
          title="Listado de Domicilios"
          items={domicilios}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filterKeys={["colonia", "cp", "numero"]} // Campos para búsqueda
          getItemId={(domicilio) => domicilio.idDomicilio} // ID único
          getItemLabel={(domicilio) =>
            `${domicilio.colonia}, CP: ${domicilio.cp}, No. ${domicilio.numero}`
          } // Etiqueta del ítem
        />
      )}
    </Box>
  );
};

export default DomiciliosList;
