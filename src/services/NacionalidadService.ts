import { Wrapper } from "../common/wrappers/Wrapper";
import { Nacionalidad } from "../dtos/nacionalidad/NacionalidadDto";
import { CreateNacionalidadDto } from "../dtos/nacionalidad/CreateNacionalidadDto";
import { getHttpClient } from "./HttpClient";

const _nationalityClient = getHttpClient("/nacionalidad");

export class NacionalidadService {
  public getAll = async () => {
    try {
      const response = await _nationalityClient.get<Wrapper<Nacionalidad>>("");
      console.log(response);
      return response.data.result;
    } catch (error) {
      console.log(error);
      return { message: "Hubo un error al obtener las nacionalidades." };
    }
  };

  public create = async (createNacionalidadDto: CreateNacionalidadDto) => {
    try {
      const response = await _nationalityClient.post("", createNacionalidadDto);
      return response.data;
    } catch (error) {
      console.log(error);
      return { message: "Hubo un error al registrar la nacionalidad." };
    }
  };

  public update = async (idNacionalidad: number, createNacionalidadDto: CreateNacionalidadDto) => {
    try {
      const response = await _nationalityClient.patch(`/${idNacionalidad}`, createNacionalidadDto);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return { message: "Hubo un error al actualizar la nacionalidad." };
    }
  };

  public delete = async (idNacionalidad: number) => {
    try {
      const response = await _nationalityClient.delete(`/${idNacionalidad}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return { message: "Hubo un error al eliminar la nacionalidad." };
    }
  };

  public getById = async (idNacionalidad: number) => {
    try {
      const response = await _nationalityClient.get<Nacionalidad>(`/${idNacionalidad}`);
      return response.data; // Retorna los datos de la nacionalidad
    } catch (error) {
      console.log(error);
      return { message: "Hubo un error al obtener la nacionalidad." };
    }
  };
}
