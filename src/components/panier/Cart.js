import React from 'react'
import NavBar from '../navbar/nabvar'
import { Container, Typography } from '@mui/material'

const Panier = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: "80px" }}>
        <Typography>Panier</Typography>
      </Container>
    </>
  )
}

export default Panier