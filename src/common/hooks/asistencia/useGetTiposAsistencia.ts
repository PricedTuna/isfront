import { useState, useCallback, useMemo } from "react";
import { GetTipoAsistenciaDto } from "../../../dtos/asistencia/GetTipoAsistenciaDto";
import { TipoAsistenciaService } from "../../../services/TiposAsistenciaService";

function useGetTiposAsistencia() {
  // Memoriza la instancia del servicio
  const asistenciaService = useMemo(() => new TipoAsistenciaService(), []);

  // Estado para los tipos de asistencia
  const [tiposAsistencia, setTiposAsistencia] = useState<GetTipoAsistenciaDto[] | undefined>(undefined);

  // Estado para el manejo de errores
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si se está cargando
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para obtener los tipos de asistencia
  const fetchTiposAsistencia = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Reiniciar el error al comenzar
    try {
      const result = await asistenciaService.getAll();
      if (Array.isArray(result)) {
        setTiposAsistencia(result as GetTipoAsistenciaDto[]);
      } else {
        setTiposAsistencia([]);
        setError("No se obtuvieron resultados válidos.");
      }
    } catch (err) {
      console.error("Error fetching tipos de asistencia:", err);
      setError("Hubo un error al obtener los tipos de asistencia.");
      setTiposAsistencia(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [asistenciaService]);

  return { tiposAsistencia, fetchTiposAsistencia, isLoading, error };
}

export default useGetTiposAsistencia;
