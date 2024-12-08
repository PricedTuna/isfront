import { Box,Typography } from '@mui/material';
import TiposContratoForm from './components/tiposContratosForm';


function TiposContratoPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontSize={50} fontFamily={"Oswald"}>
        Tipos de contrato admin Panel
      </Typography>
      <TiposContratoForm/>
    </Box>  

    
  )
}

export default TiposContratoPage
