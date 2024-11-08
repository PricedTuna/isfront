import { Wrapper } from "../common/wrappers/Wrapper";
import { GetUserDto } from "../dtos/user/GetUserDto";
import { getHttpClient } from "./HttpClient";

const _userClient = getHttpClient("/user");

export class UserService {
  public getAll = async () => {
    const { data } = await _userClient.get<Wrapper<GetUserDto>>('')
    return data.result
  }
}