export interface GetUserDto {
  idUsuario: number;
  nombreUsuario: string;
  isAdmin: boolean;
  correo: string;
  password:string;
  idEmpleado?: number | null;
  idUsuarioPadre?:number;
}