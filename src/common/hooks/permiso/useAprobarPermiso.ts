import { AprobarPermisoDto } from "../../../dtos/permiso/AprobarPermisoDto";
import { PermisoService } from "../../../services/PermisoService";

function useAprobarPermiso() {
  const permisoService = new PermisoService();

  const aprobarPermiso = (
    idPermiso: number,
    aprobarPermisoDto: AprobarPermisoDto
  ) => {
    const result = permisoService.aprobarPermiso(idPermiso, aprobarPermisoDto);
    return result;
  };

  return { aprobarPermiso };
}

export default useAprobarPermiso;
