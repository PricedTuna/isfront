export interface CreatePermisoDto {
  idTipoPermiso: number;
  idEmpleado: number;
  descripcion: string | null;
  idSesionTrabajo: number | null;
  estatus: string;
}