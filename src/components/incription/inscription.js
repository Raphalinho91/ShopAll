import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  styled,
  Snackbar,
  Alert,
} from "@mui/material";
import * as style from "../style";
import { useDispatch, useSelector } from "react-redux";
import {
  postInscription,
  selectError,
  selectInscription,
  selectStatus,
} from "../../redux/slice/inscription";
import ImageUser from "../../assets/imageUser.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TabPanel from "./TabPlanel";
import ImageVerifyEmail from "../../assets/imageVerifyEmail.png";
import ImageValidEmail from "../../assets/imageValidEmail.jpg";
import {
  postVerifyEmail,
  selectVerifyEmail,
  selectVerifyEmailError,
  selectVerifyEmailStatus,
} from "../../redux/slice/verifyEmail";
import { useNavigate } from "react-router-dom";
import {
  postSendEmail,
  selectSendEmail,
  selectSendEmailError,
  selectSendEmailStatus,
} from "../../redux/slice/sendEmail";

const Inscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectInscription);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);
  const userVerifyEmail = useSelector(selectVerifyEmail);
  const errorVerifyEmail = useSelector(selectVerifyEmailError);
  const statusVerifyEmail = useSelector(selectVerifyEmailStatus);
  const userSendEmail = useSelector(selectSendEmail);
  const errorSendEmail = useSelector(selectSendEmailError);
  const statusSendEmail = useSelector(selectSendEmailStatus);

  const [value, setValue] = React.useState(0);
  const [redirectItem, setRedirectItem] = useState(false);
  const [redirectItem1, setRedirectItem1] = useState(false);
  const [redirectItem2, setRedirectItem2] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (status === "succeeded") {
      setValue(1);
    }
  }, [status]);

  useEffect(() => {
    if (statusVerifyEmail === "succeeded") {
      setValue(2);
    }
  }, [statusVerifyEmail]);

  const changePage = () => {
    navigate("/connection");
  };

  const changePageAccueil = () => {
    navigate("/");
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  if (redirectItem) {
    setValue(0);
    setRedirectItem(false);
  }
  if (redirectItem1) {
    setValue(1);
    setRedirectItem1(false);
  }
  if (redirectItem2) {
    setValue(2);
    setRedirectItem2(false);
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password ) {
      setSnackbarMessage("Tous les inputs doivent être remplis !");
    }
    if (!email.includes("@")) {
      setSnackbarMessage("L'adresse email est invalide !");
    }
    try {
      const actionResult = await dispatch(postInscription(formData));

      if (postInscription.fulfilled.match(actionResult)) {
        setRedirectItem1(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setSnackbarOpen(true);
      console.error("An error occurred during signup");
    }
  };

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (index, value) => {
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (index < refs.length - 1 && value !== "") {
        refs[index + 1].current.focus();
      } else if (index > 0 && value === "") {
        refs[index - 1].current.focus();
      }
    }
  };

  const handleSendEmail = async (event) => {
    event.preventDefault();
    try {
      const emailVerify = formData.email;
      const actionResult = await dispatch(
        postSendEmail({ email: emailVerify })
      );

      if (postSendEmail.fulfilled.match(actionResult)) {
        setRedirectItem2(false);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleVerifyEmail = async (event) => {
    event.preventDefault();
    try {
      const upperCaseCode = verificationCode.join("").toUpperCase();
      const emailVerify = formData.email;
      const codeVerify = upperCaseCode;
      const actionResult = await dispatch(
        postVerifyEmail({ email: emailVerify, code: codeVerify })
      );

      if (postVerifyEmail.fulfilled.match(actionResult)) {
        setRedirectItem2(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <style.InscriptionPage>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Item One" value={0} sx={{ display: "none" }} />
        <Tab label="Item Two" value={1} sx={{ display: "none" }} />
        <Tab label="Item Three" value={2} sx={{ display: "none" }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <style.CardInscriptionPage>
          <style.ParentBox>
            <style.FormeCss> </style.FormeCss>
            <style.Forme2Css
              sx={{
                display: {
                  xl: "flex",
                  lg: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              {" "}
            </style.Forme2Css>
            <style.Forme3Css
              sx={{
                display: {
                  xl: "flex",
                  lg: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              {" "}
            </style.Forme3Css>
            <style.Forme4Css> </style.Forme4Css>
            <style.EnfantBox
              sx={{
                display: {
                  xl: "flex",
                  lg: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
              }}
            >
              <style.EnfantImage src={ImageUser} alt="ImageUser" />
              <style.BtnAccueil onClick={changePageAccueil}>
                Accueil
              </style.BtnAccueil>
            </style.EnfantBox>
            <style.EnfantInput>
              <style.TitleInscription>
                <span>ShopAll</span>
              </style.TitleInscription>
              <style.TextInscription>
                Créer votre compte !
              </style.TextInscription>
              <form onSubmit={handleSubmit}>
                <style.BtnBoxParent>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="firstName"
                    placeholder="Prénom"
                    onChange={handleChange}
                    sx={{ "& input": { height: "10px" } }}
                    required
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="lastName"
                    placeholder="Nom"
                    onChange={handleChange}
                    sx={{ "& input": { height: "10px" } }}
                    required
                  />
                </style.BtnBoxParent>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Adresse e-mail"
                  onChange={handleChange}
                  sx={{ "& input": { height: "10px" } }}
                  required
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  placeholder="Mot de passe"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  sx={{ "& input": { height: "10px" }, marginBottom: "20px" }}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <style.BtnInscription onClick={handleSubmit}>
                  Incription
                </style.BtnInscription>
                {status === "loading" && <p>En cours d'inscription...</p>}
                {status === "succeeded" && (
                  <p>Inscription réussie !</p>
                )}
                {status === "failed" && (
                  <p>{error}</p>
                )}
              </form>
              <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
              >
                <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </style.EnfantInput>
          </style.ParentBox>
        </style.CardInscriptionPage>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <style.CardInscriptionPage>
          <style.BoxEmail>
            <style.EmailImage src={ImageVerifyEmail} alt="ImageUser" />
            <style.TitleVerifyEmail>
              Vérifiez votre compte !
            </style.TitleVerifyEmail>
            <style.ParagraphVerifyEmail>
              Nous vous avons envoyé un code à l'adresse email suivante{" "}
              {formData.email}
            </style.ParagraphVerifyEmail>
            <style.TextVerifyEmail>Entrez le code</style.TextVerifyEmail>
            <style.RowTextfield>
              {verificationCode.map((value, index) => (
                <TextFieldStyle
                  key={index}
                  variant="outlined"
                  margin="normal"
                  inputProps={{
                    maxLength: 1,
                    inputMode: "text",
                    pattern: "[a-zA-Z0-9]*",
                  }}
                  sx={{ "& input": { width: "30px" } }}
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  inputRef={refs[index]}
                />
              ))}
            </style.RowTextfield>
            <style.BtnBoxParent>
              <style.BtnBox>
                <style.BtnInscription
                  variant="contained"
                  onClick={handleVerifyEmail}
                  disabled={verificationCode.join("").length < 6}
                >
                  Email vérifiée
                </style.BtnInscription>
                {statusVerifyEmail === "loading" && (
                  <p>En cours de vérification...</p>
                )}
                {statusVerifyEmail === "succeeded" && (
                  <p>Vérification réussie ! {userVerifyEmail}</p>
                )}
                {statusVerifyEmail === "failed" && <p>{errorVerifyEmail}</p>}
              </style.BtnBox>
              <style.BtnBox>
                <style.BtnInscription
                  variant="contained"
                  onClick={handleSendEmail}
                >
                  Renvoyé le mail
                </style.BtnInscription>
                {statusSendEmail === "loading" && <p>Envoi en cours...</p>}
                {statusSendEmail === "succeeded" && (
                  <p>Email envoyé ! {userSendEmail}</p>
                )}
                {statusSendEmail === "failed" && <p>{errorSendEmail}</p>}
              </style.BtnBox>
            </style.BtnBoxParent>
            <Snackbar
              open={snackbarOpen}
              onClose={() => setSnackbarOpen(false)}
            >
              <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </style.BoxEmail>
        </style.CardInscriptionPage>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <style.CardInscriptionPage>
          <style.BoxEmail>
            <style.EmailImage src={ImageValidEmail} alt="ImageUser" />
            <style.TitleVerifyEmail>
              Votre compte a été vérifié avec succès
            </style.TitleVerifyEmail>
            <style.ParagraphVerifyEmail>
              Nous sommes heureux de pouvoir nous compter parmis nos membres.
            </style.ParagraphVerifyEmail>
            <style.TextVerifyEmail>
              Connectez-vous maintenant <span>{formData.firstName}</span>
            </style.TextVerifyEmail>
            <style.RowTextfield></style.RowTextfield>
            <style.BtnInscription
              sx={{ mt: 2 }}
              variant="contained"
              onClick={changePage}
            >
              Connection
            </style.BtnInscription>
          </style.BoxEmail>
        </style.CardInscriptionPage>
      </TabPanel>
    </style.InscriptionPage>
  );
};

export const TextFieldStyle = styled(TextField)`
  & input {
    color: "#000";
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`;

export default Inscription;
