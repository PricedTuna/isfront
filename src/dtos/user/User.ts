export interface UserDto {
  idUsuario: number;
  nombreUsuario: string;
  isAdmin: boolean;
  correo: string;
  idEmpleado?: number;
  idUsuarioPadre?:number;
  createdate: string;
  updatedate: string;
}