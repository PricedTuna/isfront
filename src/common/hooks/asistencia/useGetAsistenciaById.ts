import { useState } from "react";
import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";
import { AsistenciasService } from "../../../services/AsistenciasService";

function useGetAsistenciaById() {
  const [asistencia, setAsistencia] = useState<GetAsistenciaDto | null>(null);
  const asistenciaService = new AsistenciasService();

  const fetAsistenciaById = async (idAsistencia: number) => {
    const asistencia = await asistenciaService.getAsistenciaById(idAsistencia);
    setAsistencia(asistencia);
    return asistencia;
  };

  return { asistencia, fetAsistenciaById };
}

export default useGetAsistenciaById;
