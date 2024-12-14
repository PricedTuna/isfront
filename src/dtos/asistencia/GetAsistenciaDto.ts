export interface GetAsistenciaDto {
  idAsistencia:     number;
  idEmpleado:       number;
  idTipoAsistencia: number;
  asistenciaInicio: Date;
  asistenciaFin:    Date | null;
  diaAsistencia:    Date;
  createDate:       Date;
  updateDate:       Date;
}
