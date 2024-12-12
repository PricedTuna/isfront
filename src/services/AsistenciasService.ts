import { Wrapper } from "../common/wrappers/Wrapper";
import { GetAsistenciaDto } from "../dtos/asistencia/GetAsistenciaDto";
import { getHttpClient } from "./HttpClient";

const _authClient = getHttpClient("/asistencia");

export class AsistenciasService {

  async getAsistenciasByUser(id: number) {
    const {data: {result}} = await _authClient.get<Wrapper<GetAsistenciaDto>>(`/${id}`)
    return result
  }

  async getAsistenciasBySesionTrabajo(id: number) {
    const {data: {result}} = await _authClient.get<Wrapper<GetAsistenciaDto>>(`/bySesionTrabajo/${id}`)
    return result
  }

}
