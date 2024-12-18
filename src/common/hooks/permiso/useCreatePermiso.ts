import { CreatePermisoDto } from "../../../dtos/permiso/CreatePermisoDto";
import { PermisoService } from "../../../services/PermisoService";

function useCreatePermiso() {
  const permisoService = new PermisoService();

  const createPermiso = async (createPermisoDto: CreatePermisoDto) => {
    const result = await permisoService.createPermiso(createPermisoDto);
    return result;
  };

  return { createPermiso };
}

export default useCreatePermiso;
