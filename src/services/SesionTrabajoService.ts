import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { Wrapper } from "../common/wrappers/Wrapper";
import { CreateSesionTrabajoDto } from "../dtos/sesionTrabajo/CreateSesionTrabajoDto";
import { GetSesionTrabajoDto } from "../dtos/sesionTrabajo/GetSesionTrabajoDto";
import { getHttpClient } from "./HttpClient";

const _sesionTrabajoClient = getHttpClient("/sesion-trabajo");

export class SesionTrabajoService {
  async getSesionesTrabajo(id: number) {
    const {
      data: { result },
    } = await _sesionTrabajoClient.get<Wrapper<GetSesionTrabajoDto>>(
      `/usuario/${id}`
    );
    return result;
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
