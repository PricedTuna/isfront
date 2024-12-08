import { Box,Typography } from '@mui/material';

import TiposAsistenciaForm from './components/TiposAsistenciaForm';


function TiposAsistenciaPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontSize={50} fontFamily={"Oswald"}>
        Tipos de Asistencias admin Panel
      </Typography>
      <TiposAsistenciaForm/>
    </Box>  

    
  )
}

export default TiposAsistenciaPage
