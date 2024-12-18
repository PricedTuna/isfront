import { Wrapper } from "../common/wrappers/Wrapper";
import { CreateSucursalDto } from "../dtos/sucursales/CreateSucursalDto";
import { SucursalDto } from "../dtos/sucursales/SucursalDto";
import { getHttpClient } from "./HttpClient";

// Crear cliente HTTP para sucursales
const _sucursalClient = getHttpClient("/sucursal");

export class SucursalService {
  // Obtener todas las sucursales
  public getAll = async () => {
    try {
      const { data } = await _sucursalClient.get<Wrapper<SucursalDto>>("");
      return data.result;
    } catch (error) {
      console.error("Error fetching sucursales:", error);
      return { message: "Hubo un error al obtener las sucursales" };
    }
  };

  // Crear una nueva sucursal
  public create = async (createSucursalDto: CreateSucursalDto) => {
    try {
      const { data } = await _sucursalClient.post("", createSucursalDto);
      return data;
    } catch (error) {
      console.error("Error creating sucursal:", error);
      return { message: "Hubo un error al crear la sucursal" };
    }
  };

  // Actualizar una sucursal existente
  public update = async (idSucursal: number, createSucursalDto: CreateSucursalDto) => {
    try {
      const { data } = await _sucursalClient.patch(`/${idSucursal}`, createSucursalDto);
      return data;
    } catch (error) {
      console.error("Error updating sucursal:", error);
      return { message: "Hubo un error al actualizar la sucursal" };
    }
  };

  // Eliminar una sucursal
  public delete = async (idSucursal: number) => {
    try {
      const { data } = await _sucursalClient.delete(`/${idSucursal}`);
      return data;
    } catch (error) {
      console.error("Error deleting sucursal:", error);
      return { message: "Hubo un error al eliminar la sucursal" };
    }
  };

  // Obtener una sucursal por su ID
  public getById = async (idSucursal: number) => {
    try {
      const { data } = await _sucursalClient.get<SucursalDto>(`/${idSucursal}`);
      return data;
    } catch (error) {
      console.error("Error fetching sucursal by ID:", error);
      return { message: "Hubo un error al obtener la sucursal" };
    }
  };
}
