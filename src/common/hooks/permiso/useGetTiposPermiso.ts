import { useState, useCallback } from "react";
import { TipoPermisoDto } from "../../../dtos/permiso/TipoPermisoDto";
import { PermisoService } from "../../../services/PermisoService";

function useGetTiposPermiso() {
  const permisoService = new PermisoService();
  const [tiposPermiso, setTiposPermiso] = useState<TipoPermisoDto[] | null>(null);

  // Memoriza la función fetchTiposPermiso
  const fetchTiposPermiso = useCallback(async () => {
    const result = await permisoService.getAllTiposPermiso();
    setTiposPermiso(result);
    return result;
  }, []);

  return { tiposPermiso, fetchTiposPermiso, setTiposPermiso };
}

export default useGetTiposPermiso;
