export interface PermisoDto {
  idPermiso:           number;
  idTipoPermiso:       number;
  idEmpleado:          number;
  descripcion:         string;
  aprobado:            boolean;
  idSesionTrabajo:     number;
  idUsuarioAprobacion: number;
  estatus:             string;
  createDate:          Date;
  updateDate:          Date;
}
