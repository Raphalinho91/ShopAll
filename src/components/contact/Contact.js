import React from 'react'
import NavBar from '../navbar/nabvar'
import { Container, Typography } from '@mui/material'

const Contact = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: "80px" }}>
        <Typography>Contact</Typography>
      </Container>
    </>
  )
}

export default Contact