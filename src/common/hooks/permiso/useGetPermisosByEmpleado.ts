import { useState } from "react";
import { PermisoDto } from "../../../dtos/permiso/PermisoDto";
import { PermisoService } from "../../../services/PermisoService";

function useGetPermisosByEmpleado() {
  const permisoService = new PermisoService();
  const [permisos, setPermisos] = useState<PermisoDto[] | null>(null);

  const fetchPermisosByEmpleado = async (idEmpleado: number) => {
    const result = await permisoService.getPermisosByEmpleado(idEmpleado);
    setPermisos(result);
    return result;
  };

  return { permisos, fetchPermisosByEmpleado };
}

export default useGetPermisosByEmpleado;
