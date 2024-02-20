import React from "react";
import NavBar from "../navbar/nabvar";
import { Container, Typography } from "@mui/material";

const Accueil = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: "80px" }}>
        <Typography>Accueil</Typography>
      </Container>
    </>
  );
};

export default Accueil;
