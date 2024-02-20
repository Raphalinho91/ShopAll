import React, { useEffect, useState } from "react";
import NavBar from "../navbar/nabvar";
import {
  Box,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getUserInfo,
  selectUserInfo,
  selectUserInfoError,
  selectUserInfoStatus,
} from "../../redux/slice/userInfo";
import * as style from "../style";
import { postAdresse } from "../../redux/slice/adresseUser";
import { postInfoPerso } from "../../redux/slice/infoPerso";
import { postInfoBancaire } from "../../redux/slice/infoBancaire";
import TabPanel from "../incription/TabPlanel";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");
  const hasToken = !!token;
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const status = useSelector(selectUserInfoStatus);
  const error = useSelector(selectUserInfoError);
  const [image, setImage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [value, setValue] = React.useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const navigate = useNavigate()

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const changePage = () => {
    navigate("/pageadmin");
  };

  useEffect(() => {
    if (hasToken) {
      dispatch(getUserInfo(token))
    }
  }, [dispatch, hasToken]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage("");
    }
  };

  useEffect(() => {
    if (user && user.email) {
      setFormData({ ...formData, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      setFormData1({ ...formData1, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      setFormData2({ ...formData2, email: user.email });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setFormData1({ ...formData1, [name]: value });
  };

  const handleChange2 = (event) => {
    const { name, value } = event.target;
    if (name === "numeroBancaire") {
      if (/\D+/g.test(value.replace(/\s/g, ""))) {
        setSnackbarMessage(
          "Veuillez n'entrer que des chiffres pour le numéro de carte bancaire."
        );
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }
      const digitsOnly = value.replace(/\D+/g, "");
      const formattedInput = digitsOnly
        .slice(0, 16)
        .replace(/(.{4})/g, "$1 ")
        .trim();

      if (digitsOnly.length !== 16) {
        setSnackbarMessage(
          "Le numéro de carte bancaire doit contenir 16 chiffres."
        );
        setSnackbarSeverity("warning");
        setOpenSnackbar(true);
      }
      setFormData2({ ...formData2, [name]: formattedInput });
    } else {
      setFormData2({ ...formData2, [name]: value });
    }
  };

  const [formData, setFormData] = useState({
    pays: "",
    province: "",
    ville: "",
    codePostale: "",
    adresse: "",
  });

  const [formData1, setFormData1] = useState({
    sexe: "",
    taille: "",
    poids: "",
    vetementTaille: "",
    pointure: "",
  });

  const [formData2, setFormData2] = useState({
    numeroBancaire: "",
    dateCarte: "",
    cvcCarte: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const actionResult = await dispatch(postAdresse(formData));

      if (postAdresse.fulfilled.match(actionResult)) {
        setIsEditing(false);
        setSnackbarMessage("Adresse de livraison mise à jour avec succès.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    try {
      const actionResult = await dispatch(postInfoPerso(formData1));

      if (postInfoPerso.fulfilled.match(actionResult)) {
        setIsEditing1(false);
        setSnackbarMessage("Informations personnels mise à jour avec succès.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    try {
      const actionResult = await dispatch(postInfoBancaire(formData2));

      if (postInfoBancaire.fulfilled.match(actionResult)) {
        setIsEditing2(false);
        setSnackbarMessage("Coordonnées bancaires mise à jour avec succès.");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!isEditing) {
    }
  }, [isEditing, isEditing1, isEditing2, formData, formData1, formData2]);

  useEffect(() => {
    if (!isEditing1) {
    }
  }, [isEditing, isEditing1, isEditing2, formData, formData1, formData2]);
  useEffect(() => {
    if (!isEditing2) {
    }
  }, [isEditing, isEditing1, isEditing2, formData, formData1, formData2]);
  useEffect(() => {
    if (!formData) {
    }
  }, [isEditing, isEditing1, isEditing2, formData, formData1, formData2]);
  useEffect(() => {
    if (!formData1) {
    }
  }, [isEditing, isEditing1, isEditing2, formData, formData1, formData2]);
  useEffect(() => {
    if (!formData2) {
    }
  }, [isEditing, isEditing1, isEditing2, formData, formData1, formData2]);

  const isAdresseComplete =
    user &&
    user.pays &&
    user.province &&
    user.ville &&
    user.codePostale &&
    user.adresse;

  const isAdresseComplete1 =
    user &&
    user.sexe &&
    user.taille &&
    user.poids &&
    user.vetementTaille &&
    user.pointure;

  const isAdresseComplete2 =
    user && user.numeroBancaire && user.dateCarte && user.cvcCarte;

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleModifyClick1 = () => {
    setIsEditing1(true);
  };

  const handleModifyClick2 = () => {
    setIsEditing2(true);
  };

  return (
    <>
      <NavBar />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container sx={{ marginTop: "80px" }}>
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && user && (
          <style.BoxProfile>
            <style.BoxNom>
              <style.BoxProfileImage>
                <style.BoxAvatar src={image || "/broken-image.jpg"} />
                <label htmlFor="file-upload">
                  <style.BtnImage variant="contained" component="span">
                    Choisir une image
                  </style.BtnImage>
                </label>
                <style.InputImage
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </style.BoxProfileImage>
              <style.BoxInfo>
                <style.TextNom>
                  {user.firstName} {user.lastName}
                </style.TextNom>
                <style.TextEmail>{user.email}</style.TextEmail>
              </style.BoxInfo>
              {user.admin === true ? (
                <style.BoxInfo>
                  <style.BtnImage sx={{ width: "145px"}} onClick={changePage}>
                      Administrateur
                  </style.BtnImage>
                </style.BoxInfo>
              ) : (
                <style.BoxInfo>
                  <style.TextEmail sx={{ marginTop: "35px" }}>
                    Client
                  </style.TextEmail>
                </style.BoxInfo>
              )}
            </style.BoxNom>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              sx={{ marginTop: "30px" }}
            >
              <Tab label="Adresse de livraison" value={0} />
              <Tab label="Informations personnels" value={1} />
              <Tab label="Coordonnée bancaire" value={2} />
            </Tabs>
            <style.BoxColumn>
              <TabPanel value={value} index={0}>
                {!isAdresseComplete || isEditing ? (
                  <>
                    {user && (
                      <form onSubmit={handleSubmit}>
                        <style.BoxAdresse>
                          <style.TextAdresse>
                            Adresse de livraison
                          </style.TextAdresse>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="pays"
                              type="pays"
                              placeholder="Pays"
                              onChange={handleChange}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                              required
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="province"
                              type="province"
                              placeholder="Province"
                              onChange={handleChange}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                              required
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="ville"
                              type="ville"
                              placeholder="Ville"
                              onChange={handleChange}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                              required
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="codePostale"
                              type="codePostale"
                              placeholder="Code postale"
                              onChange={handleChange}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                              required
                            />
                          </Box>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            name="adresse"
                            type="adresse"
                            placeholder="Adresse"
                            onChange={handleChange}
                            sx={{
                              "& input": { height: "10px" },
                              width: "100%",
                            }}
                            required
                          />
                          <style.BtnImage
                            type="submit"
                            variant="contained"
                            sx={{ width: "100%" }}
                          >
                            Validez l'adresse
                          </style.BtnImage>
                        </style.BoxAdresse>
                      </form>
                    )}
                  </>
                ) : (
                  <style.BoxAdresse>
                    <style.TextAdresse>Adresse de livraison</style.TextAdresse>
                    <Typography>
                      {user.pays}, {user.province}
                    </Typography>

                    <Typography>
                      {user.ville}, {user.codePostale}
                    </Typography>
                    <Typography>{user.adresse}</Typography>
                    <style.BtnImage
                      variant="contained"
                      onClick={handleModifyClick}
                      sx={{ width: "100%" }}
                    >
                      Modifiez
                    </style.BtnImage>
                  </style.BoxAdresse>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {!isAdresseComplete1 || isEditing1 ? (
                  <>
                    {user && (
                      <form onSubmit={handleSubmit1}>
                        <style.BoxAdresse>
                          <style.TextAdresse>
                            Informations personnels
                          </style.TextAdresse>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              width: "100%",
                              marginTop: "7px",
                            }}
                          >
                            <FormControl fullWidth sx={{ paddingTop: "8px" }}>
                              <InputLabel id="demo-simple-select-label">
                                Sexe
                              </InputLabel>
                              <Select
                                sx={{ height: "43px", width: "100%" }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="sexe"
                                value={formData1.sexe}
                                label="Sexe"
                                onChange={handleChange1}
                              >
                                <MenuItem value="Homme">Homme</MenuItem>
                                <MenuItem value="Femme">Femme</MenuItem>
                                <MenuItem value="Autre">Autre</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "1rem",
                              width: "100%",
                              marginTop: "9px",
                            }}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="taille"
                              type="taille"
                              placeholder="1m75"
                              onChange={handleChange1}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="poids"
                              type="poids"
                              placeholder="75kg"
                              onChange={handleChange1}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "1rem",
                            }}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="vetementTaille"
                              type="vetementTaille"
                              placeholder="M"
                              onChange={handleChange1}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="pointure"
                              type="pointure"
                              placeholder="42"
                              onChange={handleChange1}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                            />
                          </Box>
                          <style.BtnImage
                            type="submit"
                            variant="contained"
                            sx={{ width: "100%" }}
                          >
                            Validez les informations
                          </style.BtnImage>
                        </style.BoxAdresse>
                      </form>
                    )}
                  </>
                ) : (
                  <style.BoxAdresse>
                    <style.TextAdresse>
                      Informations personnels
                    </style.TextAdresse>
                    <Typography>
                      {user.sexe}, {user.taille}, {user.poids}
                    </Typography>
                    <Typography>Taille : {user.vetementTaille}</Typography>
                    <Typography>Pointure : {user.pointure}</Typography>
                    <style.BtnImage
                      variant="contained"
                      onClick={handleModifyClick1}
                      sx={{ width: "100%" }}
                    >
                      Modifiez
                    </style.BtnImage>
                  </style.BoxAdresse>
                )}
              </TabPanel>
              <TabPanel value={value} index={2}>
                {!isAdresseComplete2 || isEditing2 ? (
                  <>
                    {user && (
                      <form onSubmit={handleSubmit2}>
                        <style.BoxAdresse sx={{ width: "100%" }}>
                          <style.TextAdresse>
                            Coordonnée bancaire
                          </style.TextAdresse>
                          <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            name="numeroBancaire"
                            type="text"
                            placeholder="4242 4242 4242 4242"
                            onChange={handleChange2}
                            required
                            inputProps={{
                              maxLength: 19,
                            }}
                            sx={{
                              "& input": { height: "10px", width: "100%" },
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="dateCarte"
                              type="type"
                              placeholder="01/28"
                              required
                              onChange={handleChange2}
                              inputProps={{
                                maxLength: 5,
                              }}
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                            />
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="cvcCarte"
                              type="text"
                              placeholder="123"
                              inputProps={{
                                maxLength: 3,
                              }}
                              onChange={handleChange2}
                              required
                              sx={{
                                "& input": { height: "10px", width: "100%" },
                              }}
                            />
                          </Box>
                          <style.BtnImage
                            type="submit"
                            variant="contained"
                            sx={{ width: "100%", marginTop: "88px" }}
                          >
                            Validez les coordonnées
                          </style.BtnImage>
                        </style.BoxAdresse>
                      </form>
                    )}
                  </>
                ) : (
                  <style.BoxAdresse>
                    <style.TextAdresse>Coordonnée bancaire</style.TextAdresse>
                    <Typography>{user.numeroBancaire}</Typography>
                    <Typography>{user.dateCarte}</Typography>
                    <Typography>{user.cvcCarte}</Typography>
                    <style.BtnImage
                      variant="contained"
                      onClick={handleModifyClick2}
                      sx={{ width: "100%" }}
                    >
                      Modifiez
                    </style.BtnImage>
                  </style.BoxAdresse>
                )}
              </TabPanel>
              <style.BoxColumn>
                <style.BoxInfo>
                  <style.TextNom>Produits achetés</style.TextNom>
                </style.BoxInfo>
              </style.BoxColumn>
            </style.BoxColumn>
          </style.BoxProfile>
        )}
        {status === "failed" && <p>Error: {error}</p>}
      </Container>
    </>
  );
};

export default Profile;
