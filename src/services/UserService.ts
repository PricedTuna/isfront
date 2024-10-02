import { LoginUsuarioDto } from "../dtos/usuarios/LoginUsuarioDto";
import { getHttpClient } from "./HttpClient";

// TODO: CAMBIAR ESTE URL!
const _userClient = getHttpClient("/usuarios");

export class UserService {
  // TODO: CHECKIAR QUE ONDA
  public login = async (email: string, password: string) => {
    try {
      const response = await _userClient.get<LoginUsuarioDto[]>("/login");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return {message: "hubo un error pai"}
    }
  }
}