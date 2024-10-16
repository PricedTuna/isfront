import { GetLoginUserDto } from "../dtos/usuarios/GetLoginUserDto";
import { SendLoginUsuarioDto } from "../dtos/usuarios/SendLoginUsuarioDto";
import { getHttpClient } from "./HttpClient";

const _userClient = getHttpClient("/usuario");

export class UserService {
  public login = async (data: SendLoginUsuarioDto) => {
    const response = await _userClient.post<GetLoginUserDto>("/login", data);
    return response.data;
  }

  public getAll = async () => {
    const response = await _userClient.get<GetLoginUserDto[]>("");
    return response.data;
  }
}