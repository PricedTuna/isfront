import { Wrapper } from "../common/wrappers/Wrapper";
import { GetDomicilioDto } from "../dtos/domicilios/GetDomicilioDto";
import { CreateDomicilioDto } from "../dtos/domicilios/CreateDomicilioDto";
import { getHttpClient } from "./HttpClient";
import { GetPaisDto } from "../dtos/domicilios/GetPaisDto";
import { GetEstadoDto } from "../dtos/domicilios/GetEstadoDto";
import { GetMunicipioDto } from "../dtos/domicilios/GetMunicipioDto";
import { GetCiudadDto } from "../dtos/domicilios/GetCiudad";

const _domicilioClient = getHttpClient("/domicilio");
const _pais = getHttpClient("/pais");
const _estado = getHttpClient("/estado");
const _municipio= getHttpClient("/municipio");
const _ciudad = getHttpClient("/ciudad");
export class DomicilioService {
  public getAll = async () => {
    try {
      const { data } = await _domicilioClient.get<Wrapper<GetDomicilioDto>>("");
      return data.result;
    } catch (error) {
      console.error("Error fetching domicilios:", error);
      return { message: "Hubo un error al obtener los domicilios" };
    }
  };

  public create = async (createDomicilioDto: CreateDomicilioDto) => {
    try {
      const { data } = await _domicilioClient.post("", createDomicilioDto);
      return data;
    } catch (error) {
      console.error("Error creating domicilio:", error);
      return { message: "Hubo un error al crear el domicilio" };
    }
  };

  public update = async (idDomicilio: number, createDomicilioDto: CreateDomicilioDto) => {
    try {
      const { data } = await _domicilioClient.patch(`/${idDomicilio}`, createDomicilioDto);
      return data;
    } catch (error) {
      console.error("Error updating domicilio:", error);
      return { message: "Hubo un error al actualizar el domicilio" };
    }
  };

  public delete = async (idDomicilio: number) => {
    try {
      const { data } = await _domicilioClient.delete(`/${idDomicilio}`);
      return data;
    } catch (error) {
      console.error("Error deleting domicilio:", error);
      return { message: "Hubo un error al eliminar el domicilio" };
    }
  };

  public getById = async (idDomicilio: number) => {
    try {
      const { data } = await _domicilioClient.get<GetDomicilioDto>(`/${idDomicilio}`);
      return data;
    } catch (error) {
      console.error("Error fetching domicilio by ID:", error);
      return { message: "Hubo un error al obtener el domicilio" };
    }
  };

  public getPaises = async () => {
    try {
      const { data } = await _pais.get<Wrapper<GetPaisDto>>('');
      return data.result;
    } catch (error) {
      console.error("Error fetching paises:", error);
      return { message: "Hubo un error al obtener los países" };
    }
  };

  public getEstados = async (idPais: number) => {
    try {
      const { data } = await _estado.get<Wrapper<GetEstadoDto>>(`/`);
      return data.result;
    } catch (error) {
      console.error("Error fetching estados:", error);
      return { message: "Hubo un error al obtener los estados" };
    }
  };

  public getMunicipios = async (idEstado: number) => {
    try {
      const { data } = await _municipio.get<Wrapper<GetMunicipioDto>>(`/`);
      return data.result;
    } catch (error) {
      console.error("Error fetching municipios:", error);
      return { message: "Hubo un error al obtener los municipios" };
    }
  };

  public getCiudades = async (idMunicipio: number) => {
    try {
      const { data } = await _ciudad.get<Wrapper<GetCiudadDto>>(`/`);
      return data.result;
    } catch (error) {
      console.error("Error fetching ciudades:", error);
      return { message: "Hubo un error al obtener las ciudades" };
    }
  };
}
