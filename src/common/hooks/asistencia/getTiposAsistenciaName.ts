import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";
import { GetTipoAsistenciaDto } from "../../../dtos/asistencia/GetTipoAsistenciaDto";

export const useGetTipoAsistenciaName = (asistencia: GetAsistenciaDto, tiposAsistencia: GetTipoAsistenciaDto[] | null) => {
  if (!tiposAsistencia) return;

  const tipoAsistencia = tiposAsistencia.find(
    (tipoAsistencia) =>
      asistencia.idTipoAsistencia == tipoAsistencia.idTipoAsistencia
  );

  return tipoAsistencia ? tipoAsistencia.nombreAsistencia : "error";
};