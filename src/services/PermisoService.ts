import { Wrapper } from "../common/wrappers/Wrapper";
import { CreatePermisoDto } from "../dtos/permiso/CreatePermisoDto";
import { PermisoDto } from "../dtos/permiso/PermisoDto";
import { TipoPermisoDto } from "../dtos/permiso/TipoPermisoDto";
import { getHttpClient } from "./HttpClient";

const _permisoClient = getHttpClient("/permiso");
const _tipoPermisoClient = getHttpClient("/tipopermiso");

export class PermisoService {
  public getAllTiposPermiso = async () => {
    const response = await _tipoPermisoClient.get<Wrapper<TipoPermisoDto>>("");
    return response.data.result;
  };

  public createPermiso = async (createPermisoDto: CreatePermisoDto) => {
    const response = await _permisoClient.post<Wrapper<PermisoDto>>(
      "",
      createPermisoDto
    );
    return response.data.result;
  };
}
