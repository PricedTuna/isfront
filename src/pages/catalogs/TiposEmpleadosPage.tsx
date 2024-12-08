import { Box,Typography } from '@mui/material';

import TiposEmpleadosForm from './components/TiposEmpleadoForm';


function TiposEmpleadosPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontSize={50} fontFamily={"Oswald"}>
        Tipos de Empleados admin Panel
      </Typography>
      <TiposEmpleadosForm/>
    </Box>  

    
  )
}

export default TiposEmpleadosPage
