import { useState } from 'react'
import { Auto } from '../../../../dtos/autos/AutoDto'
import { AutoService } from '../../../../services/AutoService';

function useGetAutos() {
  const _autoService = new AutoService();
  const [autos, setAutos] = useState<Auto[]>([])

  const fetchAutos = async () => {
    try {
      const response = await _autoService.getAll();
      if (Array.isArray(response)) {
        setAutos(response);
      }
    } catch (error) {
      console.error("Error fetching autos:", error);
    }
  };

  return {autos, fetchAutos}
}

export default useGetAutos
