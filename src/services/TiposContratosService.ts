import { Wrapper } from "../common/wrappers/Wrapper";
import { CreateTipoContrato, GetTiposContratosDto } from "../dtos/tiposcontratos/GetTiposContratosDto";
import { getHttpClient } from "./HttpClient";

const _tipoContratoClient = getHttpClient("/tipocontrato");

export class TipoContratoService {
  // Obtener todos los tipos de contrato
  public getAll = async () => {
    try {
      const response = await _tipoContratoClient.get<Wrapper<GetTiposContratosDto>>("");
      return response.data.result; // Retorna la lista de tipos de contrato
    } catch (error) {
      console.error("Error al obtener los tipos de contrato:", error);
      return { message: "Hubo un error al obtener los tipos de contrato." };
    }
  };

  // Crear un nuevo tipo de contrato
  public create = async (createTipoContratoDto: CreateTipoContrato) => {
    try {
      const response = await _tipoContratoClient.post("", createTipoContratoDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al crear el tipo de contrato:", error);
      return { message: "Hubo un error al crear el tipo de contrato." };
    }
  };

  // Actualizar un tipo de contrato existente
  public update = async (idTipoContrato: number, tipoContratoDto: GetTiposContratosDto) => {
    try {
      const response = await _tipoContratoClient.patch(`/${idTipoContrato}`, tipoContratoDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al actualizar el tipo de contrato:", error);
      return { message: "Hubo un error al actualizar el tipo de contrato." };
    }
  };

  // Eliminar un tipo de contrato por ID
  public delete = async (idTipoContrato: number) => {
    try {
      const response = await _tipoContratoClient.delete(`/${idTipoContrato}`);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al eliminar el tipo de contrato:", error);
      return { message: "Hubo un error al eliminar el tipo de contrato." };
    }
  };

  // Obtener un tipo de contrato por ID
  public getById = async (idTipoContrato: number) => {
    try {
      const response = await _tipoContratoClient.get<GetTiposContratosDto>(`/${idTipoContrato}`);
      return response.data; // Retorna los datos del tipo de contrato
    } catch (error) {
      console.error("Error al obtener el tipo de contrato:", error);
      return { message: "Hubo un error al obtener el tipo de contrato." };
    }
  };
}
