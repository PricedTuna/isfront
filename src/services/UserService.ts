import { Wrapper } from "../common/wrappers/Wrapper";
import { GetUserDto } from "../dtos/user/GetUserDto";
import { CreateUserDto } from "../dtos/user/CreateUserDto";
import { getHttpClient } from "./HttpClient";
import { UserDto } from "../dtos/user/User";

const _userClient = getHttpClient("/usuario");

export class UserService {
  public getAll = async () => {
    try {
      const { data } = await _userClient.get<Wrapper<UserDto>>("");
      return data.result;
    } catch (error) {
      console.error("Error fetching users:", error);
      return { message: "Hubo un error al obtener los usuarios" };
    }
  };

  public create = async (createUserDto: CreateUserDto) => {
    try {
      const { data } = await _userClient.post("", createUserDto);
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return { message: "Hubo un error al crear el usuario" };
    }
  };

  public update = async (idUsuario: number, createUserDto: CreateUserDto) => {
    try {
      const { data } = await _userClient.patch(`/${idUsuario}`, createUserDto);
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      return { message: "Hubo un error al actualizar el usuario" };
    }
  };

  public delete = async (idUsuario: number) => {
    try {
      const { data } = await _userClient.delete(`/${idUsuario}`);
      return data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return { message: "Hubo un error al eliminar el usuario" };
    }
  };

  public getById = async (idUsuario: number) => {
    try {
      const { data } = await _userClient.get<GetUserDto>(`/${idUsuario}`);
      return data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return { message: "Hubo un error al obtener el usuario" };
    }
  };
}
