export interface GetAsistenciaDto {
  idAsistencia:     number;
  idEmpleado:       number;
  idTipoAsistencia: number;
  asistenciaInicio: Date;
  asistenciaFin:    Date;
  diaAsistencia:    Date;
  createDate:       Date;
  updateDate:       Date;
}
