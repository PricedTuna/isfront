import { Wrapper } from "../common/wrappers/Wrapper";
import { GetTipoEmpleadoDto, CreateTipoEmpleado } from "../dtos/empleado/GetTipoEmpleado";
import { getHttpClient } from "./HttpClient";

const _tipoEmpleadoClient = getHttpClient("/tipoempleado");

export class TipoEmpleadoService {
  // Obtener todos los tipos de empleado
  public getAll = async () => {
    try {
      const response = await _tipoEmpleadoClient.get<Wrapper<GetTipoEmpleadoDto>>("");
      return response.data.result; // Retorna la lista de tipos de empleado
    } catch (error) {
      console.error("Error al obtener los tipos de empleado:", error);
      return { message: "Hubo un error al obtener los tipos de empleado." };
    }
  };

  // Crear un nuevo tipo de empleado
  public create = async (createTipoEmpleadoDto: CreateTipoEmpleado) => {
    try {
      const response = await _tipoEmpleadoClient.post("", createTipoEmpleadoDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al crear el tipo de empleado:", error);
      return { message: "Hubo un error al crear el tipo de empleado." };
    }
  };

  // Actualizar un tipo de empleado existente
  public update = async (idTipoEmpleado: number, tipoEmpleadoDto: GetTipoEmpleadoDto) => {
    try {
      const response = await _tipoEmpleadoClient.patch(`/${idTipoEmpleado}`, tipoEmpleadoDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al actualizar el tipo de empleado:", error);
      return { message: "Hubo un error al actualizar el tipo de empleado." };
    }
  };

  // Eliminar un tipo de empleado por ID
  public delete = async (idTipoEmpleado: number) => {
    try {
      const response = await _tipoEmpleadoClient.delete(`/${idTipoEmpleado}`);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al eliminar el tipo de empleado:", error);
      return { message: "Hubo un error al eliminar el tipo de empleado." };
    }
  };

  // Obtener un tipo de empleado por ID
  public getById = async (idTipoEmpleado: number) => {
    try {
      const response = await _tipoEmpleadoClient.get<GetTipoEmpleadoDto>(`/${idTipoEmpleado}`);
      return response.data; // Retorna los datos del tipo de empleado
    } catch (error) {
      console.error("Error al obtener el tipo de empleado:", error);
      return { message: "Hubo un error al obtener el tipo de empleado." };
    }
  };
}
