import { SingleWrapper } from "../common/wrappers/SingleWrapper";
import { EmpleadoDto } from "../dtos/empleado/GetEmpleadoDto";
import { getHttpClient } from "./HttpClient";

// DTOs para otras entidades relacionadas
import { GetEstadoCivilDto } from "../dtos/empleado/GetEstadoCivilDto";
import { GetDepartamentoDto } from "../dtos/empleado/GetDepartamentoDto";
import { GetPuestoDto } from "../dtos/empleado/GetPuestoDto";
import { GetTipoEmpleadoDto } from "../dtos/empleado/GetTipoEmpleado";
import { GetDiasVacacionesDto } from "../dtos/empleado/GetDiasVacaciones";
import { CreateEmpleadoDto } from "../dtos/empleado/CreateEmpleadodto";

const _authClient = getHttpClient("/empleado");
const _estadoCivilClient = getHttpClient("/estadocivil");
const _departamentoClient = getHttpClient("/departamento");
const _puestoClient = getHttpClient("/puesto");
const _tipoEmpleadoClient = getHttpClient("/tipoempleado");
const _diasVacacionesClient = getHttpClient("/diasvacaciones");

export class EmpleadoService {
  // Obtener un empleado por ID
  public getEmpleadoById = async (id: number) => {
    const { data: { result } } = await _authClient.get<SingleWrapper<EmpleadoDto>>(`/${id}`);
    return result;
  };

  // Obtener todos los empleados
  public getAllEmpleados = async () => {
    const { data: { result } } = await _authClient.get<SingleWrapper<EmpleadoDto>>(`/`);
    return result;
  };

  // Crear un nuevo empleado
  public createEmpleado = async (empleado: EmpleadoDto) => {
    const { data: { result } } = await _authClient.post<SingleWrapper<CreateEmpleadoDto>>(`/`, empleado);
    return result;
  };

  // Actualizar un empleado existente
  public updateEmpleado = async (id: number, empleado: Partial<EmpleadoDto>) => {
    const { data: { result } } = await _authClient.put<SingleWrapper<EmpleadoDto>>(`/${id}`, empleado);
    return result;
  };

  // Eliminar un empleado por ID
  public deleteEmpleado = async (id: number) => {
    await _authClient.delete<void>(`/${id}`);
  };

  // Servicios para Estado Civil
  public getAllEstadoCivil = async () => {
    const { data: { result } } = await _estadoCivilClient.get<SingleWrapper<GetEstadoCivilDto>>(`/`);
    return result;
  };

  // Servicios para Departamento
  public getAllDepartamentos = async () => {
    const { data: { result } } = await _departamentoClient.get<SingleWrapper<GetDepartamentoDto>>(`/`);
    return result;
  };

  // Servicios para Puesto
  public getAllPuestos = async () => {
    const { data: { result } } = await _puestoClient.get<SingleWrapper<GetPuestoDto>>(`/`);
    return result;
  };

  // Servicios para Tipo de Empleado
  public getAllTiposEmpleado = async () => {
    const { data: { result } } = await _tipoEmpleadoClient.get<SingleWrapper<GetTipoEmpleadoDto>>(`/`);
    return result;
  };

  // Servicios para Días de Vacaciones
  public getAllDiasVacaciones = async () => {
    const { data: { result } } = await _diasVacacionesClient.get<SingleWrapper<GetDiasVacacionesDto>>(`/`);
    return result;
  };
}
