export interface GetLoginUserDto {
  idUsuario: number;
  nombreUsuario: string;
  correo: string;
  idEmpleado?: string;
  createdate: string;
  updatedate: string;
}