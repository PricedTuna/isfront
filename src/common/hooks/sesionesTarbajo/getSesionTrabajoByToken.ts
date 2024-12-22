import { useState } from "react";
import { GetSesionTrabajoDto } from "../../../dtos/sesionTrabajo/GetSesionTrabajoDto";
import { SesionTrabajoService } from "../../../services/SesionTrabajoService";

export enum SesionTrabajoErrors {
  SESION_TRABAJO_NOT_FOUND = "SESION_TRABAJO_NOT_FOUND",
}

function getSesionTrabajoByToken() {
  const sesionTrabajoService = new SesionTrabajoService();

  const [sesionTrabajo, setSesionTrabajo] =
    useState<GetSesionTrabajoDto | null>(null);

  const fetchSesionTrabajoByToken = async (token: string) => {
    try {
      const sesionTrabajo = await sesionTrabajoService.getSesionTrabajoByToken(
        token
      );
      setSesionTrabajo(sesionTrabajo);
      return sesionTrabajo;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { fetchSesionTrabajoByToken, sesionTrabajo };
}

export default getSesionTrabajoByToken;
