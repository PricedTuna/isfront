export interface CreateAsistenciaDto {
  idEmpleado: number;
  idTipoAsistencia: number;
  asistenciaInicio: Date | null;
  diaAsistencia: Date | null;
}