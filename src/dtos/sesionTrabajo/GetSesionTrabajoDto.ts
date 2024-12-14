export interface GetSesionTrabajoDto {
  idSesionTrabajo: number;
  sesionToken:     string;
  createDate:      Date;
  finalizedDate:   Date | null;
  idUsuario:       number;
}
