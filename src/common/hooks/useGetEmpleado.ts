import { useState } from "react";
import { EmpleadoService } from "../../services/EmpleadoService";
import { GetEmpleadoDto } from "../../dtos/empleado/GetEmpleadoDto";

function useGetEmpleado() {
  const empleadoService = new EmpleadoService();
  const [empleado, setEmpleado] = useState<GetEmpleadoDto | null>(null)

  const fetchEmpleado = async (id: number) => {
    const empleado = await empleadoService.getEmpleadoById(id);
    setEmpleado(empleado)
    return empleado;
  };

  return { empleado, fetchEmpleado };
}

export default useGetEmpleado;
