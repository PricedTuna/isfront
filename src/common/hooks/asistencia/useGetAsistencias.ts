import { useState } from "react";
import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";
import { AsistenciasService } from "../../../services/AsistenciasService";

function useGetAsistencias() {
  const asistenciasService = new AsistenciasService();
  const [asistencias, setAsistencias] = useState<GetAsistenciaDto[] | null>(
    null
  );

  const fetchAsistencias = async (id: number) => {
    const asistencias = await asistenciasService.getAsistenciasByUser(id);
    setAsistencias(asistencias);
    return asistencias;
  };

  return { asistencias, fetchAsistencias };
}

export default useGetAsistencias;
