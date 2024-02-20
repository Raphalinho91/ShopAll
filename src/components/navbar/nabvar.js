import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DrawerComp from "./DrawerComp";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/slice/userInfo";

const PAGES = ["Produits", "Panier", "Contact"];

const NavBar = () => {
  const [value, setValue] = useState("");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const hasToken = !!token;

  useEffect(() => {
    if (hasToken) {
      dispatch(getUserInfo()).catch((error) =>
        console.error("API call failed:", error)
      );
    }
  }, [dispatch, hasToken]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/produits");
    } else if (newValue === 1) {
      navigate("/panier");
    } else if (newValue === 2) {
      navigate("/recherche");
    } else if (newValue === 3) {
      navigate("/contact");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/')
  };

  return (
    <React.Fragment>
      <AppBar sx={{ backgroundColor: "#8F00FF" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "1.5rem", paddingLeft: "8%" }}>
                SHOPALL
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={handleChange}
                indicatorColor="none"
              >
                {PAGES.map((page, index) => (
                  <Tab key={index} label={page} />
                ))}
              </Tabs>
              <ShoppingBagIcon onClick={() => navigate("/")} sx={{ marginLeft: "auto" }} />
              {hasToken ? (
                <Box sx={{ marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/profile")}
                    sx={{
                      marginLeft: "auto",
                      color: "#8F00FF",
                      backgroundColor: "#FFF",
                      "&:hover": {
                        color: "#8F00FF",
                        backgroundColor: "#FFF",
                      },
                    }}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleLogout}
                    sx={{
                      marginLeft: "10px",
                      color: "#8F00FF",
                      backgroundColor: "#FFF",
                      "&:hover": {
                        color: "#8F00FF",
                        backgroundColor: "#FFF",
                      },
                    }}
                  >
                    Déconnection
                  </Button>
                  </Box>
              ) : (
                <Box sx={{ marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/inscription")}
                    sx={{
                      marginLeft: "auto",
                      color: "#8F00FF",
                      backgroundColor: "#FFF",
                      "&:hover": {
                        color: "#8F00FF",
                        backgroundColor: "#FFF",
                      },
                    }}
                  >
                    Inscription
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/connection")}
                    sx={{
                      marginLeft: "10px",
                      color: "#8F00FF",
                      backgroundColor: "#FFF",
                      "&:hover": {
                        color: "#8F00FF",
                        backgroundColor: "#FFF",
                      },
                    }}
                  >
                    Connection
                  </Button>
                </Box>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
