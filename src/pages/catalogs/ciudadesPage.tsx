
import CiudadesForm from './components/ciudadesForm'
import { Box,Typography } from '@mui/material';


function CiudadesPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontSize={50}>
        Ciudades admin Panel
      </Typography>
      <CiudadesForm/>
    </Box>  

    
  )
}

export default CiudadesPage
