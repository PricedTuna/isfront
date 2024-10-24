import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { GetLoginUserDto } from "../dtos/usuarios/GetLoginUserDto";
import { SendLoginUsuarioDto } from "../dtos/usuarios/SendLoginUsuarioDto";
import { getHttpClient } from "./HttpClient";

const _userClient = getHttpClient("/auth");

export class AuthService {
  public login = async (data: SendLoginUsuarioDto) => {
    const response = await _userClient.post<SingleWrapper<GetLoginUserDto>>("/login", data);
    return response.data.result;
  }

  public getAll = async () => {
    const response = await _userClient.get<GetLoginUserDto[]>("");
    return response.data;
  }
}