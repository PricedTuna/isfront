import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { Wrapper } from "../common/wrappers/Wrapper";
import { CreateSesionTrabajoDto } from "../dtos/sesionTrabajo/CreateSesionTrabajoDto";
import { GetSesionTrabajoDto } from "../dtos/sesionTrabajo/GetSesionTrabajoDto";
import { getHttpClient } from "./HttpClient";

const _sesionTrabajoClient = getHttpClient("/sesion-trabajo");

export class SesionTrabajoService {
  async getSesionesTrabajo(idUsuario: number) {
    const {
      data: { result },
    } = await _sesionTrabajoClient.get<Wrapper<GetSesionTrabajoDto>>(
      `/usuario/${idUsuario}`
    );
    return result;
  }

  async getSesionTrabajoById(idSesionTrabajo: number) {
    const {
      data: { result },
    } = await _sesionTrabajoClient.get<SingleWrapper<GetSesionTrabajoDto>>(
      `/${idSesionTrabajo}`
    );
    return result;
  }

  async getSesionTrabajoByToken(token:string) {
    const {data: {result}} = await _sesionTrabajoClient.get<SingleWrapper<GetSesionTrabajoDto>>(`/token/${token}`)
    return result
  }

  async createSesionTrabajo(createSesionTrabajoDto: CreateSesionTrabajoDto) {
    const {
      data: { result },
    } = await _sesionTrabajoClient.post<SingleWrapper<GetSesionTrabajoDto>>(
      "",
      createSesionTrabajoDto
    );
    return result;
  }

  async finalizarSesionTrabajo(id: number){
    const {} = await _sesionTrabajoClient.patch<SingleWrapper<GetSesionTrabajoDto>>(`/${id}/finalizar`)
  }
}
