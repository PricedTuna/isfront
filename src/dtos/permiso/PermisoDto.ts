export interface PermisoDto {
  idPermiso:           number;
  idTipoPermiso:       number;
  idEmpleado:          number;
  descripcion:         string;
  aprobado:            boolean;
  idSesionTrabajo:     number;
  idUsuarioAprobacion: number | null;
  estatus:             string;
  createDate:          Date;
  updateDate:          Date;
}
