import { useState, useCallback, useMemo } from "react";
import { TipoPermisoDto } from "../../../dtos/permiso/TipoPermisoDto";
import { TipoPermisoService } from "../../../services/TiposPermisosService";

function useGetTiposPermiso() {
  // Memoriza la instancia del servicio
  const permisoService = useMemo(() => new TipoPermisoService(), []);

  // Estado para los tipos de permiso
  const [tiposPermiso, setTiposPermiso] = useState<TipoPermisoDto[] | undefined>(undefined);

  // Estado para el manejo de errores
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si se está cargando
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para obtener los tipos de permiso
  const fetchTiposPermiso = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Reiniciar el error al comenzar
    try {
      const result = await permisoService.getAll();
      if (Array.isArray(result)) {
        setTiposPermiso(result as TipoPermisoDto[]);
      } else {
        setTiposPermiso([]);
        setError("No se obtuvieron resultados válidos.");
      }
    } catch (err) {
      console.error("Error fetching tipos de permiso:", err);
      setError("Hubo un error al obtener los tipos de permiso.");
      setTiposPermiso(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [permisoService]);

  return { tiposPermiso, fetchTiposPermiso, isLoading, error };
}

export default useGetTiposPermiso;
