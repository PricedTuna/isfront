export interface CreateUserDto {
    nombreUsuario: string;
    correo: string;
    password?: string;
    idEmpleado?: number;
    idUsuarioPadre?:number;
    isAdmin?:boolean;
  }
