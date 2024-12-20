import GenericList from "../List";
import { TipoPermisoDto } from "../../dtos/permiso/TipoPermisoDto";
import { TipoPermisoService } from "../../services/TiposPermisosService";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useGetTiposPermiso from "../../common/hooks/permiso/useGetTiposPermiso";

const TipoPermisoList = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const _tipoPermisoService = new TipoPermisoService();

  const { tiposPermiso, fetchTiposPermiso } = useGetTiposPermiso();

  useEffect(() => {
    fetchTiposPermiso();
  }, [fetchTiposPermiso]);

  const handleEdit = (tipoPermiso: TipoPermisoDto) => {
    navigate("/admin/tipopermiso", { state: tipoPermiso }); // Navega a la página de edición y pasa el tipo de permiso como estado
  };

  const handleDelete = async (id: number) => {
    try {
      await _tipoPermisoService.delete(id);
      fetchTiposPermiso();
    } catch (error) {
      console.error("Error al eliminar el tipo de permiso:", error);
    }
  };

  return (
    <GenericList<TipoPermisoDto>
      title="Listado de Tipos de Permiso"
      items={tiposPermiso || []} // Proporciona un arreglo vacío si `tiposPermiso` es `null`
      onEdit={handleEdit}
      onDelete={handleDelete}
      filterKeys={["nombrePermiso"]} // Filtrar por el nombre del permiso
      getItemId={(tipo) => tipo.idTipoPermiso} // Devuelve el ID único
      getItemLabel={(tipo) => tipo.nombrePermiso} // Devuelve la etiqueta para mostrar
    />
  );
};

export default TipoPermisoList;
