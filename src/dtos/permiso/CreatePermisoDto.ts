export interface CreatePermisoDto {
  idTipoPermiso: number;
  idEmpleado: number;
  descripcion: string | null;
  aprobado: string;
  idSesionTrabajo: number | null;
  idUsuarioAprobacion: number;
  estatus: string;
}