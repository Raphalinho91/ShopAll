import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PAGES = ["Produits", "Panier", "Contact", "Inscription", "Connection"];

const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const handleDrawerItemClick = (page) => {
    setOpenDrawer(false);
    if (page === "Produits") {
      navigate("/produits");
    } else if (page === "Panier") {
      navigate("/panier");
    } else if (page === "Contact") {
      navigate("/contact");
    } else if (page === "Inscription") {
      navigate("/inscription");
    } else if (page === "Connection") {
      navigate("/connection");
    }
  };

  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {PAGES.map((page, index) => (
            <ListItemButton key={index} onClick={() => handleDrawerItemClick(page)}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
