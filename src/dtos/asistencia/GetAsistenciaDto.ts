export interface GetAsistenciaDto {
  idAsistencia:     number;
  idEmpleado:       number;
  idTipoAsistencia: number;
  idSesionTrabajo:  number;
  asistenciaInicio: Date;
  asistenciaFin:    Date;
  createDate:       Date;
  updateDate:       Date;
}
