import GenericList from "../List";
import { GetTipoAsistenciaDto } from "../../dtos/asistencia/GetTipoAsistenciaDto";
import { TipoAsistenciaService } from "../../services/TiposAsistenciaService";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useGetTiposAsistencia from "../../common/hooks/asistencia/useGetTiposAsistencia";

const TipoAsistenciaList = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const _tipoAsistenciaService = new TipoAsistenciaService();

  // Custom hook para obtener los tipos de asistencia
  const { tiposAsistencia, fetchTiposAsistencia } = useGetTiposAsistencia();

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchTiposAsistencia();
  }, [fetchTiposAsistencia]);

  // Manejar edición
  const handleEdit = (tipoAsistencia: GetTipoAsistenciaDto) => {
    navigate("/admin/tipos-asistencia", { state: tipoAsistencia }); // Navegar con el estado del tipo de asistencia
  };

  // Manejar eliminación
  const handleDelete = async (id: number) => {
    try {
      await _tipoAsistenciaService.delete(id); // Llamar al servicio para eliminar
      fetchTiposAsistencia(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el tipo de asistencia:", error);
    }
  };

  // Renderizar el listado utilizando el componente genérico
  return (
    <GenericList<GetTipoAsistenciaDto>
      title="Listado de Tipos de Asistencia"
      items={tiposAsistencia || []} // Si no hay datos, se pasa un array vacío
      onEdit={handleEdit} // Función para manejar la edición
      onDelete={handleDelete} // Función para manejar la eliminación
      filterKeys={["nombreAsistencia"]} // Campos para buscar
      getItemId={(tipo) => tipo.idTipoAsistencia} // Método para obtener el ID único
      getItemLabel={(tipo) => tipo.nombreAsistencia} // Método para obtener la etiqueta visible
    />
  );
};

export default TipoAsistenciaList;
