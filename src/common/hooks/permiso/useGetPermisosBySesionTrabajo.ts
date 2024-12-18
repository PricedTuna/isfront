import { useState } from "react";
import { PermisoDto } from "../../../dtos/permiso/PermisoDto";
import { PermisoService } from "../../../services/PermisoService";

function useGetPermisosBySesionTrabajo() {
  const permisoService = new PermisoService();
  const [permisosBySesionTrabajo, setPermisosBySesionTrabajo] = useState<
    PermisoDto[] | null
  >(null);

  const fetchPermisosBySesionTrabajo = async (idSesionTrabajo: number) => {
    const result = await permisoService.getPermisosBySesionTrabajo(
      idSesionTrabajo
    );
    setPermisosBySesionTrabajo(result);
    return result;
  };

  return { fetchPermisosBySesionTrabajo, permisosBySesionTrabajo };
}

export default useGetPermisosBySesionTrabajo;
