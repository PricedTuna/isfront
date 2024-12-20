import GenericList from "../List";
import { GetTiposContratosDto } from "../../dtos/tiposcontratos/GetTiposContratosDto";
import { TipoContratoService } from "../../services/TiposContratosService";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useGetTiposContrato from "../../common/hooks/tipocontrato/get-tipo-contrato";

const TipoContratoList = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const _tipoContratoService = new TipoContratoService();

  // Custom hook para obtener los tipos de contrato
  const { tiposContrato, fetchTiposContrato } = useGetTiposContrato();

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchTiposContrato();
  }, [fetchTiposContrato]);

  // Manejar edición
  const handleEdit = (tipoContrato: GetTiposContratosDto) => {
    navigate("/admin/tipos-contrato", { state: tipoContrato }); // Navegar con el estado del tipo de contrato
  };

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    try {
      await _tipoContratoService.delete(id); // Llamar al servicio para eliminar
      fetchTiposContrato(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el tipo de contrato:", error);
    }
  };

  // Renderizar el listado utilizando el componente genérico
  return (
    <GenericList<GetTiposContratosDto>
      title="Listado de Tipos de Contrato"
      items={tiposContrato || []} // Si no hay datos, se pasa un array vacío
      onEdit={handleEdit} // Función para manejar la edición
      onDelete={handleDelete} // Función para manejar la eliminación
      filterKeys={["descripcionContrato"]} // Campos para buscar
      getItemId={(tipo) => tipo.idTipoContrato} // Método para obtener el ID único
      getItemLabel={(tipo) => tipo.descripcionContrato} // Método para obtener la etiqueta visible
    />
  );
};

export default TipoContratoList;
