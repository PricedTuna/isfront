import { useState, useCallback, useMemo } from "react";
import { GetTiposContratosDto } from "../../../dtos/tiposcontratos/GetTiposContratosDto";
import { TipoContratoService } from "../../../services/TiposContratosService";

function useGetTiposContrato() {
  // Memoriza la instancia del servicio
  const contratoService = useMemo(() => new TipoContratoService(), []);

  // Estado para los tipos de contrato
  const [tiposContrato, setTiposContrato] = useState<GetTiposContratosDto[] | undefined>(undefined);

  // Estado para el manejo de errores
  const [error, setError] = useState<string | null>(null);

  // Estado para indicar si se está cargando
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para obtener los tipos de contrato
  const fetchTiposContrato = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Reiniciar el error al comenzar
    try {
      const result = await contratoService.getAll();
      if (Array.isArray(result)) {
        setTiposContrato(result as GetTiposContratosDto[]);
      } else {
        setTiposContrato([]);
        setError("No se obtuvieron resultados válidos.");
      }
    } catch (err) {
      console.error("Error fetching tipos de contrato:", err);
      setError("Hubo un error al obtener los tipos de contrato.");
      setTiposContrato(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [contratoService]);

  return { tiposContrato, fetchTiposContrato, isLoading, error };
}

export default useGetTiposContrato;
