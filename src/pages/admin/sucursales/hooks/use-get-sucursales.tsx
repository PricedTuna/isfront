import { useState, useCallback, useMemo } from "react";
import { SucursalDto } from "../../../../dtos/sucursales/SucursalDto";
import { SucursalService } from "../../../../services/SucursalService";

function useGetSucursales() {
  const _sucursalService = useMemo(() => new SucursalService(), []); // Memorizar la instancia del servicio
  const [sucursales, setSucursales] = useState<SucursalDto[] | undefined>(undefined); // Permitir estado `undefined` inicialmente

  const fetchSucursales = useCallback(async () => {
    try {
      const response = await _sucursalService.getAll();
      if (response && Array.isArray(response)) {
        setSucursales(response as SucursalDto[]); // Asegurar el tipo SucursalDto[]
      } else {
        setSucursales([]); // Si no es un arreglo válido, establece un arreglo vacío
      }
    } catch (error) {
      console.error("Error fetching sucursales:", error);
      setSucursales(undefined); // Limpia el estado en caso de error
    }
  }, [_sucursalService]);

  return { sucursales, fetchSucursales };
}

export default useGetSucursales;
