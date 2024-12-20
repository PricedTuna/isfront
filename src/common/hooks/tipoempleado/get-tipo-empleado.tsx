import { useState, useCallback, useMemo } from "react";
import { GetTipoEmpleadoDto } from "../../../dtos/empleado/GetTipoEmpleado";
import { TipoEmpleadoService } from "../../../services/TiposEmpleadoService";

function useGetTiposEmpleado() {
  // Memoriza la instancia del servicio
  const empleadoService = useMemo(() => new TipoEmpleadoService(), []);

  // Estado para los tipos de empleado
  const [tiposEmpleado, setTiposEmpleado] = useState<GetTipoEmpleadoDto[] | undefined>(undefined);

  // Estado para el manejo de errores
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si se está cargando
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para obtener los tipos de empleado
  const fetchTiposEmpleado = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Reiniciar el error al comenzar
    try {
      const result = await empleadoService.getAll();
      if (Array.isArray(result)) {
        setTiposEmpleado(result as GetTipoEmpleadoDto[]);
      } else {
        setTiposEmpleado([]);
        setError("No se obtuvieron resultados válidos.");
      }
    } catch (err) {
      console.error("Error fetching tipos de empleado:", err);
      setError("Hubo un error al obtener los tipos de empleado.");
      setTiposEmpleado(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [empleadoService]);

  return { tiposEmpleado, fetchTiposEmpleado, isLoading, error };
}

export default useGetTiposEmpleado;
