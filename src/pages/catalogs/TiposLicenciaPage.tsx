import { Box,Typography } from '@mui/material';
import TiposLicenciaForm from './components/TiposLicenciaForm';


function TiposLicenciaPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontSize={50} fontFamily={"Oswald"}>
        Tipos de Licencia admin Panel
      </Typography>
      <TiposLicenciaForm/>
    </Box>  

    
  )
}

export default TiposLicenciaPage
