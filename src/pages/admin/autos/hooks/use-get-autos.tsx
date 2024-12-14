import { useState, useCallback, useMemo } from "react";
import { Auto } from "../../../../dtos/autos/AutoDto";
import { AutoService } from "../../../../services/AutoService";

function useGetAutos() {
  const _autoService = useMemo(() => new AutoService(), []); // Memorizar la instancia del servicio
  const [autos, setAutos] = useState<Auto[] | undefined>(undefined); // Permitir estado `undefined` inicialmente

  const fetchAutos = useCallback(async () => {
    try {
      const response = await _autoService.getAll();
      if (response && Array.isArray(response)) {
        setAutos(response as Auto[]); // Asegurar el tipo Auto[]
      } else {
        setAutos([]); // Si no es un arreglo válido, establece un arreglo vacío
      }
    } catch (error) {
      console.error("Error fetching autos:", error);
      setAutos(undefined); // Limpia el estado en caso de error
    }
  }, [_autoService]);

  return { autos, fetchAutos };
}

export default useGetAutos;
