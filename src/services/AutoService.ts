import { Wrapper } from "../common/wrappers/Wrapper";
import { Auto } from "../dtos/autos/AutoDto";
import { CreateAutoDto } from "../dtos/autos/CreateAutoDto";
import { getHttpClient } from "./HttpClient"

const _autosClient = getHttpClient("/auto");

export class AutoService {
  public getAll = async () => {
    try {
      const response = await _autosClient.get<Wrapper<Auto>>("");
      console.log(response);
      return response.data.result;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"}
    }
  }

  public create = async (createAutoDto: CreateAutoDto) => {
    try {
      const response = await _autosClient.post("", createAutoDto);
      return response.data;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"};
    }
  }

  public update = async (idAuto: number, createAutoDto: CreateAutoDto) => {
    try {
      const response = await _autosClient.patch(`/${idAuto}`, createAutoDto);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"};
    }
  }

  public delete = async (idAuto: number) => {
    try {
      const response = await _autosClient.delete(`/${idAuto}`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"};
    }
  }
}
