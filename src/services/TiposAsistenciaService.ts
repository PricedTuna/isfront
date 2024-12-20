import { Wrapper } from "../common/wrappers/Wrapper";
import { GetTipoAsistenciaDto, CreateTipoAsistecnia } from "../dtos/asistencia/GetTipoAsistenciaDto";
import { getHttpClient } from "./HttpClient";

const _tipoAsistenciaClient = getHttpClient("/tipoasistencia");

export class TipoAsistenciaService {
  // Obtener todos los tipos de asistencia
  public getAll = async () => {
    try {
      const response = await _tipoAsistenciaClient.get<Wrapper<GetTipoAsistenciaDto>>("");
      return response.data.result; // Retorna la lista de tipos de asistencia
    } catch (error) {
      console.error("Error al obtener los tipos de asistencia:", error);
      return { message: "Hubo un error al obtener los tipos de asistencia." };
    }
  };

  // Crear un nuevo tipo de asistencia
  public create = async (createTipoAsistenciaDto: CreateTipoAsistecnia) => {
    try {
      const response = await _tipoAsistenciaClient.post("", createTipoAsistenciaDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al crear el tipo de asistencia:", error);
      return { message: "Hubo un error al crear el tipo de asistencia." };
    }
  };

  // Actualizar un tipo de asistencia existente
  public update = async (idTipoAsistencia: number, tipoAsistenciaDto: GetTipoAsistenciaDto) => {
    try {
      const response = await _tipoAsistenciaClient.patch(`/${idTipoAsistencia}`, tipoAsistenciaDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al actualizar el tipo de asistencia:", error);
      return { message: "Hubo un error al actualizar el tipo de asistencia." };
    }
  };

  // Eliminar un tipo de asistencia por ID
  public delete = async (idTipoAsistencia: number) => {
    try {
      const response = await _tipoAsistenciaClient.delete(`/${idTipoAsistencia}`);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al eliminar el tipo de asistencia:", error);
      return { message: "Hubo un error al eliminar el tipo de asistencia." };
    }
  };

  // Obtener un tipo de asistencia por ID
  public getById = async (idTipoAsistencia: number) => {
    try {
      const response = await _tipoAsistenciaClient.get<GetTipoAsistenciaDto>(`/${idTipoAsistencia}`);
      return response.data; // Retorna los datos del tipo de asistencia
    } catch (error) {
      console.error("Error al obtener el tipo de asistencia:", error);
      return { message: "Hubo un error al obtener el tipo de asistencia." };
    }
  };
}
