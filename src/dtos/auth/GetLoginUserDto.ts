export interface GetLoginUserDto {
  idUsuario: number;
  nombreUsuario: string;
  isAdmin: boolean;
  correo: string;
  idEmpleado?: string;
  createdate: string;
  updatedate: string;
}