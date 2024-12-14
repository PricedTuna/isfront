import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { GetEmpleadoDto } from "../dtos/empleado/GetEmpleadoDto";
import { getHttpClient } from "./HttpClient";

const _authClient = getHttpClient("/empleado");

export class EmpleadoService {

  public getEmpleadoById = async (id: number) => {
    const {data: {result}} = await _authClient.get<SingleWrapper<GetEmpleadoDto>>(`/${id}`)
    return result
  }

}