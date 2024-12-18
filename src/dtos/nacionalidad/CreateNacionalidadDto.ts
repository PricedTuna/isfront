import { Nacionalidad } from "./NacionalidadDto";

export interface CreateNacionalidadDto extends Partial<Nacionalidad> {
    nacionalidad:string;
}