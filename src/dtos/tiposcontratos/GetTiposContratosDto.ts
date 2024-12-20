export interface GetTiposContratosDto {
        idTipoContrato:number;
        descripcionContrato:string;
        


}
export interface CreateTipoContrato extends Partial<GetTiposContratosDto> {
        descripcionContrato:string;
      
      }