import GenericList from "../List";
import { GetTipoEmpleadoDto } from "../../dtos/empleado/GetTipoEmpleado";
import { TipoEmpleadoService } from "../../services/TiposEmpleadoService";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useGetTiposEmpleado from "../../common/hooks/tipoempleado/get-tipo-empleado";

const TipoEmpleadoList = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const _tipoEmpleadoService = new TipoEmpleadoService();

  // Hook personalizado para obtener los tipos de empleado
  const { tiposEmpleado, fetchTiposEmpleado } = useGetTiposEmpleado();

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetchTiposEmpleado();
  }, [fetchTiposEmpleado]);

  // Manejar la edición de un tipo de empleado
  const handleEdit = (tipoEmpleado: GetTipoEmpleadoDto) => {
    navigate("/admin/tipoempleado", { state: tipoEmpleado }); // Navegar con el estado del tipo de empleado
  };

  // Manejar la eliminación de un tipo de empleado
  const handleDelete = async (id: number) => {
    try {
      await _tipoEmpleadoService.delete(id); // Llamar al servicio para eliminar
      fetchTiposEmpleado(); // Actualizar la lista después de la eliminación
    } catch (error) {
      console.error("Error al eliminar el tipo de empleado:", error);
    }
  };

  // Renderizar el listado utilizando el componente genérico
  return (
    <GenericList<GetTipoEmpleadoDto>
      title="Listado de Tipos de Empleado"
      items={tiposEmpleado || []} // Si no hay datos, se pasa un array vacío
      onEdit={handleEdit} // Función para manejar la edición
      onDelete={handleDelete} // Función para manejar la eliminación
      filterKeys={["nombreTipoEmpleado"]} // Campos para buscar
      getItemId={(tipo) => tipo.idTipoEmpleado} // Método para obtener el ID único
      getItemLabel={(tipo) => tipo.nombreTipoEmpleado} // Método para obtener la etiqueta visible
    />
  );
};

export default TipoEmpleadoList;
