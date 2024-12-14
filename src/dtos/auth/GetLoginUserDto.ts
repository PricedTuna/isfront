export interface GetLoginUserDto {
  accessToken: string;
  user: LoginUserDto;
}

export interface LoginUserDto {
  idUsuario:      number;
  nombreUsuario:  string;
  correo:         string;
  idUsuarioPadre: number;
  isAdmin:        boolean;
  createdate:     Date;
  updatedate:     Date;
  idEmpleado:     number | null;
}
