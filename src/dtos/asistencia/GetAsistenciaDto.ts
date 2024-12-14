export interface GetAsistenciaDto {
  idAsistencia:     number;
  idEmpleado:       number;
  idTipoAsistencia: number;
  asistenciaInicio: Date;
  asistenciaFin:    Date | null;
  createDate:       Date;
  updateDate:       Date;
}
