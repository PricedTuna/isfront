
import { Box, Typography } from '@mui/material'
import NacionalidadesForm from './components/nacionalidadesForm';
function NacionalidadesPage() {
  return (
    <Box>
      <Typography variant="h3" textAlign="center" fontFamily={"Oswald"}>
        Nacionalidades admin Panel
      </Typography>
      <NacionalidadesForm/>
    </Box>

    
    
  )
}

export default NacionalidadesPage
