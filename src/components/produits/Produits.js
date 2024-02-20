import React from "react";
import NavBar from "../navbar/nabvar";
import { Container, Typography } from "@mui/material";

const Produits = () => {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: "80px" }}>
        <Typography>Produits</Typography>
      </Container>
    </>
  );
};

export default Produits;
