export interface TipoPermisoDto {
  idTipoPermiso: number;
  nombrePermiso: string;
  createDate:    Date;
  updateDate:    Date;
}
export interface CreateTipoPermisoDto extends Partial<TipoPermisoDto> {
  nombrePermiso: string;

}
