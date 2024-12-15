import { GetAsistenciaDto } from "../asistencia/GetAsistenciaDto";
import { GetSesionTrabajoDto } from "./GetSesionTrabajoDto";

export interface GetFullSesionTrabajoDto extends GetSesionTrabajoDto {
  asistencias: GetAsistenciaDto[]
}