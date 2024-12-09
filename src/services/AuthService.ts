import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { GetLoginUserDto } from "../dtos/auth/GetLoginUserDto";
import { SendLoginUsuarioDto } from "../dtos/auth/SendLoginUsuarioDto";
import { getHttpClient } from "./HttpClient";

const _authClient = getHttpClient("/auth");

export class AuthService {
  public login = async (data: SendLoginUsuarioDto) => {
    const {data: {result}} = await _authClient.post<SingleWrapper<GetLoginUserDto>>("/login", data);
    return result;
  }

  public getAll = async () => {
    const response = await _authClient.get<GetLoginUserDto[]>("");
    return response.data;
  }
}