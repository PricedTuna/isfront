import { Wrapper } from "../common/wrappers/Wrapper";
import { TipoPermisoDto, CreateTipoPermisoDto } from '../dtos/permiso/TipoPermisoDto';
import { getHttpClient } from "./HttpClient";

const _tipoPermisoClient = getHttpClient("/tipopermiso");

export class TipoPermisoService {
  // Obtener todos los tipos de permiso
  public getAll = async () => {
    try {
      const response = await _tipoPermisoClient.get<Wrapper<TipoPermisoDto>>("");
      return response.data.result; // Retorna la lista de tipos de permiso
    } catch (error) {
      console.error("Error al obtener los tipos de permiso:", error);
      return { message: "Hubo un error al obtener los tipos de permiso." };
    }
  };

  // Crear un nuevo tipo de permiso
  public create = async (CreateTipoPermisoDto: CreateTipoPermisoDto) => {
    try {
      const response = await _tipoPermisoClient.post("", CreateTipoPermisoDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al crear el tipo de permiso:", error);
      return { message: "Hubo un error al crear el tipo de permiso." };
    }
  };

  // Actualizar un tipo de permiso existente
  public update = async (idTipoPermiso: number, tipoPermisoDto: TipoPermisoDto) => {
    try {
      const response = await _tipoPermisoClient.patch(`/${idTipoPermiso}`, tipoPermisoDto);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al actualizar el tipo de permiso:", error);
      return { message: "Hubo un error al actualizar el tipo de permiso." };
    }
  };

  // Eliminar un tipo de permiso por ID
  public delete = async (idTipoPermiso: number) => {
    try {
      const response = await _tipoPermisoClient.delete(`/${idTipoPermiso}`);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error("Error al eliminar el tipo de permiso:", error);
      return { message: "Hubo un error al eliminar el tipo de permiso." };
    }
  };

  // Obtener un tipo de permiso por ID
  public getById = async (idTipoPermiso: number) => {
    try {
      const response = await _tipoPermisoClient.get<TipoPermisoDto>(`/${idTipoPermiso}`);
      return response.data; // Retorna los datos del tipo de permiso
    } catch (error) {
      console.error("Error al obtener el tipo de permiso:", error);
      return { message: "Hubo un error al obtener el tipo de permiso." };
    }
  };
}
