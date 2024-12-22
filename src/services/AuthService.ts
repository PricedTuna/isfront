import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { GetLoginUserDto } from "../dtos/auth/GetLoginUserDto";
import { SendLoginUsuarioDto } from "../dtos/auth/SendLoginUsuarioDto";
import { getHttpClient } from "./HttpClient";

const _authClient = getHttpClient("/auth");

export enum AuthError {
  UserNotFound = "User not found",
  Unauthorized = "Unauthorized",
}

export class AuthService {
  public login = async (sendLoginUsuarioDto: SendLoginUsuarioDto) => {
    try {
      const { data } = await _authClient.post<SingleWrapper<GetLoginUserDto>>(
        "/login",
        sendLoginUsuarioDto
      );

      if (data.statusCode === 401) {
        throw new Error(AuthError.Unauthorized);
      }

      return data.result;
    } catch (error: any) {
      // Añadir un tipo de error específico o manejar diferentes casos
      if (error.response?.status === 401) {
        throw new Error(AuthError.Unauthorized); // O lanza un error con el código de error
      }
      throw error; // Propaga cualquier otro error
    }
  };

  public getAll = async () => {
    try {
      const response = await _authClient.get<GetLoginUserDto[]>("");
      return response.data;
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  };
}
