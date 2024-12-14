import { useState, useCallback, useMemo } from "react";
import { Nacionalidad } from "../../../dtos/nacionalidad/NacionalidadDto";
import { NacionalidadService } from "../../../services/NacionalidadService";

function useGetNationalities() {
  const _nacionalidadService = useMemo(() => new NacionalidadService(), []); // Memoriza la instancia del servicio
  const [nationalities, setNationalities] = useState<Nacionalidad[] | undefined>(undefined); // Estado inicial `undefined`

  const fetchNationalities = useCallback(async () => {
    try {
      const response = await _nacionalidadService.getAll();
      if (response && Array.isArray(response)) {
        setNationalities(response as Nacionalidad[]); // Asegurar el tipo Nacionalidad[]
      } else {
        setNationalities([]); // Establecer arreglo vacío si la respuesta no es válida
      }
    } catch (error) {
      console.error("Error fetching nationalities:", error);
      setNationalities(undefined); // Limpia el estado en caso de error
    }
  }, [_nacionalidadService]);

  return { nationalities, fetchNationalities };
}

export default useGetNationalities;
