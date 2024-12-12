import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { Wrapper } from "../common/wrappers/Wrapper";
import { CreateAsistenciaDto } from "../dtos/asistencia/CreateAsistenciaDto";
import { GetAsistenciaDto } from "../dtos/asistencia/GetAsistenciaDto";
import { getHttpClient } from "./HttpClient";

const _authClient = getHttpClient("/asistencia");

export class AsistenciasService {

  async createAsistencia(createAsistencia: CreateAsistenciaDto) {
    const {data: {result}} = await _authClient.post<SingleWrapper<GetAsistenciaDto>>('', createAsistencia)
    return result
  }

  async getAsistenciasByUser(id: number) {
    const {data: {result}} = await _authClient.get<Wrapper<GetAsistenciaDto>>(`/${id}`)
    return result
  }

  async getAsistenciasBySesionTrabajo(id: number) {
    const {data: {result}} = await _authClient.get<Wrapper<GetAsistenciaDto>>(`/bySesionTrabajo/${id}`)
    return result
  }

}
