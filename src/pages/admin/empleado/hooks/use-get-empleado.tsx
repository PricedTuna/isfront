import { useState, useCallback, useMemo } from "react";
import { EmpleadoService } from "../../../../services/EmpleadoService";
import { EmpleadoDto } from "../../../../dtos/empleado/GetEmpleadoDto";
import { GetEstadoCivilDto } from "../../../../dtos/empleado/GetEstadoCivilDto";
import { GetDepartamentoDto } from "../../../../dtos/empleado/GetDepartamentoDto";
import { GetPuestoDto } from "../../../../dtos/empleado/GetPuestoDto";
import { GetTipoEmpleadoDto } from "../../../../dtos/empleado/GetTipoEmpleado";
import { GetDiasVacacionesDto } from "../../../../dtos/empleado/GetDiasVacaciones";

function useGetEmpleado() {
  const _empleadoService = useMemo(() => new EmpleadoService(), []); // Instancia del servicio

  const [empleados, setEmpleados] = useState<EmpleadoDto[] | undefined>(undefined);
  const [estadosCiviles, setEstadosCiviles] = useState<GetEstadoCivilDto[]>([]);
  const [departamentos, setDepartamentos] = useState<GetDepartamentoDto[]>([]);
  const [puestos, setPuestos] = useState<GetPuestoDto[]>([]);
  const [tiposEmpleado, setTiposEmpleado] = useState<GetTipoEmpleadoDto[]>([]);
  const [diasVacaciones, setDiasVacaciones] = useState<GetDiasVacacionesDto[]>([]);

  // Generar opciones para ComboBoxes
  const estadoCivilOptions = useMemo(
    () => estadosCiviles.map((estado) => ({ id: estado.idEstadoCivil, nombre: estado.estadoCivil })),
    [estadosCiviles]
  );

  const departamentoOptions = useMemo(
    () => departamentos.map((dep) => ({ id: dep.idDepartamento, nombre: dep.nombreDepartamento })),
    [departamentos]
  );

  const puestoOptions = useMemo(
    () => puestos.map((puesto) => ({ id: puesto.idPuesto, nombre: puesto.nombrePuesto })),
    [puestos]
  );

  const tipoEmpleadoOptions = useMemo(
    () => tiposEmpleado.map((tipo) => ({ id: tipo.idTipoEmpleado, nombre: tipo.nombreTipoEmpleado})),
    [tiposEmpleado]
  );

  const diasVacacionesOptions = useMemo(
    () => diasVacaciones.map((dias) => ({ id: dias.idDiasVacaciones, dias: dias.diasVacaciones })),
    [diasVacaciones]
  );

  // Cargar todos los empleados
  const fetchEmpleados = useCallback(async () => {
    try {
      const response = await _empleadoService.getAllEmpleados();
      setEmpleados(Array.isArray(response) ? (response as EmpleadoDto[]) : []);
    } catch (error) {
      console.error("Error fetching empleados:", error);
      setEmpleados(undefined);
    }
  }, [_empleadoService]);

  // Cargar estados civiles
  const fetchEstadosCiviles = useCallback(async () => {
    try {
      const response = await _empleadoService.getAllEstadoCivil();
      setEstadosCiviles(Array.isArray(response) ? (response as GetEstadoCivilDto[]) : []);
    } catch (error) {
      console.error("Error fetching estados civiles:", error);
      setEstadosCiviles([]);
    }
  }, [_empleadoService]);

  // Cargar departamentos
  const fetchDepartamentos = useCallback(async () => {
    try {
      const response = await _empleadoService.getAllDepartamentos();
      setDepartamentos(Array.isArray(response) ? (response as GetDepartamentoDto[]) : []);
    } catch (error) {
      console.error("Error fetching departamentos:", error);
      setDepartamentos([]);
    }
  }, [_empleadoService]);

  // Cargar puestos
  const fetchPuestos = useCallback(async () => {
    try {
      const response = await _empleadoService.getAllPuestos();
      setPuestos(Array.isArray(response) ? (response as GetPuestoDto[]) : []);
    } catch (error) {
      console.error("Error fetching puestos:", error);
      setPuestos([]);
    }
  }, [_empleadoService]);

  // Cargar tipos de empleado
  const fetchTiposEmpleado = useCallback(async () => {
    try {
      const response = await _empleadoService.getAllTiposEmpleado();
      setTiposEmpleado(Array.isArray(response) ? (response as GetTipoEmpleadoDto[]) : []);
    } catch (error) {
      console.error("Error fetching tipos de empleado:", error);
      setTiposEmpleado([]);
    }
  }, [_empleadoService]);

  // Cargar días de vacaciones
  const fetchDiasVacaciones = useCallback(async () => {
    try {
      const response = await _empleadoService.getAllDiasVacaciones();
      setDiasVacaciones(Array.isArray(response) ? (response as GetDiasVacacionesDto[]) : []);
    } catch (error) {
      console.error("Error fetching días de vacaciones:", error);
      setDiasVacaciones([]);
    }
  }, [_empleadoService]);

  return {
    empleados,
    estadosCiviles,
    departamentos,
    puestos,
    tiposEmpleado,
    diasVacaciones,
    estadoCivilOptions,
    departamentoOptions,
    puestoOptions,
    tipoEmpleadoOptions,
    diasVacacionesOptions,
    fetchEmpleados,
    fetchEstadosCiviles,
    fetchDepartamentos,
    fetchPuestos,
    fetchTiposEmpleado,
    fetchDiasVacaciones,
  };
}

export default useGetEmpleado;
