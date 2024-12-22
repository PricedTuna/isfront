export interface GetTipoEmpleadoDto {
    idTipoEmpleado:number;
    nombreTipoEmpleado:string;
       
}
export interface CreateTipoEmpleado extends Partial<GetTipoEmpleadoDto> {
        nombreTipoEmpleado:string;
}