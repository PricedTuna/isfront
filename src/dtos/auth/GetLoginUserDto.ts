export interface GetLoginUserDto {
  accessToken: string;
  user: loginUserDto;
}

export interface loginUserDto {
  idUsuario: number;
  nombreUsuario: string;
  isAdmin: boolean;
  correo: string;
  idEmpleado?: string;
  createdate: string;
  updatedate: string;
}
