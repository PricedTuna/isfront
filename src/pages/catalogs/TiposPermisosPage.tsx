import { Box,Typography } from '@mui/material';
import TiposPermisosForm from './components/TiposPermisosForm';


function TiposPermisosPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontSize={50} fontFamily={"Oswald"}>
        Tipos de Permisos admin Panel
      </Typography>
      <TiposPermisosForm/>
    </Box>  

    
  )
}

export default TiposPermisosPage
