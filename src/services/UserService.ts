import { GetLoginUserDto } from "../dtos/usuarios/GetLoginUserDto";
import { SendLoginUsuarioDto } from "../dtos/usuarios/SendLoginUsuarioDto";
import { getHttpClient } from "./HttpClient";

const _userClient = getHttpClient("/usuario");

export class UserService {
  public login = async (data: SendLoginUsuarioDto) => {
    try {
      const response = await _userClient.post<GetLoginUserDto>("/login", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"}
    }
  }

  public getAll = async () => {
    try {
      const response = await _userClient.get<GetLoginUserDto[]>("");
      return response.data;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"}
    }
  }
}