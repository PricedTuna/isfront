import { useState } from 'react';
import { Nacionalidad } from '../../../dtos/nacionalidad/NacionalidadDto';
import { NacionalidadService } from '../../../services/NacionalidadService';

function useGetNationalities() {
  const _nacionalidadService = new NacionalidadService();
  const [nationalities, setNationalities] = useState<Nacionalidad[]>([]);

  const fetchNationalities = async () => {
    try {
      const response = await _nacionalidadService.getAll();
      if (Array.isArray(response)) {
        setNationalities(response);
      }
    } catch (error) {
      console.error("Error fetching nationalities:", error);
    }
  };

  return { nationalities, fetchNationalities };
}

export default useGetNationalities;
