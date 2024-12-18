import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { Wrapper } from "../common/wrappers/Wrapper";
import { CreateAsistenciaDto } from "../dtos/asistencia/CreateAsistenciaDto";
import { FinalizarAsistenciaDto } from "../dtos/asistencia/FinalizarAsistenciaDto";
import { GetAsistenciaDto } from "../dtos/asistencia/GetAsistenciaDto";
import { GetTipoAsistenciaDto } from "../dtos/asistencia/GetTipoAsistenciaDto";
import { getHttpClient } from "./HttpClient";

const _asistenciasClient = getHttpClient("/asistencia");
const _tipoAsistencias = getHttpClient("/tipoasistencia");

export class AsistenciasService {

  async createAsistencia(createAsistencia: CreateAsistenciaDto) {
    const {data: {result}} = await _asistenciasClient.post<SingleWrapper<GetAsistenciaDto>>('', createAsistencia)
    return result
  }

  async finalizarAsistencia(idAsistencia: number, finalizarAsistenciaDto: FinalizarAsistenciaDto) {
    const {data: {result} } = await _asistenciasClient.patch<SingleWrapper<GetAsistenciaDto>>(`/finalziarAsistencia/${idAsistencia}`, finalizarAsistenciaDto)
    return result
  }

  async getTiposAsistencias() {
    const {data: {result}} = await _tipoAsistencias.get<Wrapper<GetTipoAsistenciaDto>>('')
    console.log(result)
    return result
  }

  async getAsistenciasByEmpleado(id: number) {
    const {data: {result}} = await _asistenciasClient.get<Wrapper<GetAsistenciaDto>>(`/byEmpleado/${id}`)
    return result
  }

  async getAsistenciasBySesionTrabajo(id: number) {
    const {data: {result}} = await _asistenciasClient.get<Wrapper<GetAsistenciaDto>>(`/bySesionTrabajo/${id}`)
    return result
  }

}
