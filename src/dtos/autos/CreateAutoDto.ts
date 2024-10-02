import { Auto } from "./AutoDto";

export interface CreateAutoDto extends Partial<Auto> {
  nombreModelo: string;
  yearModelo: string;
  ordenRegistro: string;
  fechaCompra: string;
  numeroPlacas: string;
  numeroSerie: string;
  numeroPoliza: string;
  vencimientoPoliza: string;
}