import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { Wrapper } from "../common/wrappers/Wrapper";
import { AprobarPermisoDto } from "../dtos/permiso/AprobarPermisoDto";
import { CreatePermisoDto } from "../dtos/permiso/CreatePermisoDto";
import { PermisoDto } from "../dtos/permiso/PermisoDto";
import { TipoPermisoDto } from "../dtos/permiso/TipoPermisoDto";
import { getHttpClient } from "./HttpClient";

const _permisoClient = getHttpClient("/permiso");
const _tipoPermisoClient = getHttpClient("/tipopermiso");

export class PermisoService {
  public getAllTiposPermiso = async () => {
    const {data: {result}} = await _tipoPermisoClient.get<Wrapper<TipoPermisoDto>>("");
    return result;
  };

  public getPermisosByEmpleado = async (idEmpleado: number) => {
    const {data: {result}} = await _permisoClient.get<Wrapper<PermisoDto>>(`empleado/${idEmpleado}`);
    return result
  }

  public getPermisosBySesionTrabajo = async (idSesionTrabajo: number) => {
    const {data: {result}} = await _permisoClient.get<Wrapper<PermisoDto>>(`sesion-trabajo/${idSesionTrabajo}`);
    return result
  }

  public createPermiso = async (createPermisoDto: CreatePermisoDto) => {
    const response = await _permisoClient.post<Wrapper<PermisoDto>>(
      "",
      createPermisoDto
    );
    return response.data.result;
  };

  public aprobarPermiso = async (idPermiso: number, aprobarPermisoDto: AprobarPermisoDto) => {
    const {data: {result}} = await _permisoClient.patch<SingleWrapper<PermisoDto>>(`aprobar/${idPermiso}`, aprobarPermisoDto)
    return result
  }

}
