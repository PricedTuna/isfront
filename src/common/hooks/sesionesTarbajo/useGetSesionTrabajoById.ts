import { useState } from "react";
import { GetSesionTrabajoDto } from "../../../dtos/sesionTrabajo/GetSesionTrabajoDto";
import { SesionTrabajoService } from "../../../services/SesionTrabajoService";

function useGetSesionTrabajoById() {
  const sesionTrabajoService = new SesionTrabajoService();
  const [sesionTrabajo, setSesionTrabajo] =
    useState<GetSesionTrabajoDto | null>(null);

  const fetchSesionTrabajoById = async (idSesionTrabajo: number) => {
    const sesionTrabajo = await sesionTrabajoService.getSesionTrabajoById(
      idSesionTrabajo
    );
    setSesionTrabajo(sesionTrabajo);
    return sesionTrabajo;
  };

  return { sesionTrabajo, fetchSesionTrabajoById };
}

export default useGetSesionTrabajoById;
