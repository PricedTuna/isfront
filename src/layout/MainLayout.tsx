import { Box } from '@mui/material'
import {  Outlet } from 'react-router-dom'
import ButtonAppBar from '../components/ButtonAppBar'

function MainLayout() {
  return (
    <Box margin={0} padding={0}>
      <ButtonAppBar />
      <Outlet />
    </Box>
  )
}

export default MainLayout
