import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Box p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
      <Typography textAlign="center" py={2} variant='h2'>HomePage!</Typography>
      
      <Box>
        <Link to="/autos">
          <Button variant="outlined">Ir hacia autos</Button>
        </Link>
      </Box>
    </Box>
  )
}

export default HomePage
