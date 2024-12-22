export interface GetTipoAsistenciaDto {
  idTipoAsistencia: number;
  nombreAsistencia: string;
  createDate:       Date;
  updateDate:       Date;
}
export interface CreateTipoAsistecnia extends Partial<GetTipoAsistenciaDto> {

  nombreAsistencia: string;

}