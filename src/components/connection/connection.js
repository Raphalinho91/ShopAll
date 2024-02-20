import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Snackbar,
  Alert,
} from "@mui/material";
import * as style from "../style";
import { useDispatch, useSelector } from "react-redux";
import ImageUser from "../../assets/imageUser.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TabPanel from "./TabPlanel";
import ImageValidEmail from "../../assets/imageValidEmail.jpg";
import { useNavigate } from "react-router-dom";
import {
  postConnection,
  selectConnection,
  selectError,
  selectStatus,
} from "../../redux/slice/connection";
import ImageVerifyEmail from "../../assets/imageVerifyEmail.png";
import { postSendEmailPassword } from "../../redux/slice/forgotPassword";
import { TextFieldStyle } from "../incription/inscription";
import { postVerifyEmailPassword } from "../../redux/slice/verifyResetPwd";
import { postNewPassword } from "../../redux/slice/updatePassword";

const Connection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectConnection);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  const [value, setValue] = React.useState(0);
  const [redirectItem0, setRedirectItem0] = useState(false);
  const [redirectItem1, setRedirectItem1] = useState(false);
  const [redirectItem2, setRedirectItem2] = useState(false);
  const [redirectItem3, setRedirectItem3] = useState(false);
  const [redirectItem4, setRedirectItem4] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSendEmail = async (event) => {
    event.preventDefault();
    try {
      const emailVerify = formData.email;
      const actionResult = await dispatch(
        postSendEmailPassword({ email: emailVerify })
      );

      if (postSendEmailPassword.fulfilled.match(actionResult)) {
        setRedirectItem3(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      setValue(1);
    }
  }, [status]);

  const changePageAccueil = () => {
    navigate("/");
  };

  const ForgotPage = () => {
    setRedirectItem2(true);
  };

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  if (redirectItem0) {
    setValue(0);
    setRedirectItem0(false);
  }

  if (redirectItem1) {
    setValue(1);
    setRedirectItem1(false);
  }

  if (redirectItem2) {
    setValue(2);
    setRedirectItem2(false);
  }

  if (redirectItem3) {
    setValue(3);
    setRedirectItem3(false);
  }

  if (redirectItem4) {
    setValue(4);
    setRedirectItem4(false);
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
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
    try {
      const actionResult = await dispatch(postConnection(formData));

      if (postConnection.fulfilled.match(actionResult)) {
        setRedirectItem1(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setSnackbarOpen(true);
      setSnackbarMessage("An error occurred during signup");
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

  const handleVerifyEmail = async (event) => {
    event.preventDefault();
    try {
      const upperCaseCode = verificationCode.join("").toUpperCase();
      const emailVerify = formData.email;
      const codeVerify = upperCaseCode;
      const actionResult = await dispatch(
        postVerifyEmailPassword({ email: emailVerify, code: codeVerify })
      );

      if (postVerifyEmailPassword.fulfilled.match(actionResult)) {
        setRedirectItem4(true);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    try {
      const passwordNew = formData.newPassword;
      const passwordConfirm = formData.confirmPassword;
      const actionResult = await dispatch(
        postNewPassword({
          newPassword: passwordNew,
          confirmPassword: passwordConfirm,
        })
      );

      if (postNewPassword.fulfilled.match(actionResult)) {
        setRedirectItem0(true);
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
            <style.Forme2Css> </style.Forme2Css>
            <style.Forme3Css> </style.Forme3Css>
            <style.Forme4Css> </style.Forme4Css>
            <style.EnfantInput>
              <style.TitleInscription>
                <span>ShopAll</span>
              </style.TitleInscription>
              <style.TextInscription>Connectez-vous !</style.TextInscription>
              <form onSubmit={handleSubmit}>
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
                  sx={{ "& input": { height: "10px" } }}
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
                <style.BtnInscription
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                  fullWidth
                  variant="contained"
                >
                  Connection
                </style.BtnInscription>
                {status === "loading" && <p>En cours de connection...</p>}
                {status === "succeeded" && <p>Connection réussie ! {user} </p>}
                {status === "failed" && <p>{error}</p>}
              </form>
              <style.BtnAccueil
                sx={{
                  mt: 2,
                  width: "220px"
                }}
                onClick={ForgotPage}
                fullWidth
                variant="contained"
              >
                Oubli du mot de passe
              </style.BtnAccueil>
              <Snackbar
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
              >
                <Alert severity="error" onClose={() => setSnackbarOpen(false)}>
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </style.EnfantInput>
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
          </style.ParentBox>
        </style.CardInscriptionPage>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <style.CardInscriptionPage>
          <style.BoxEmail>
            <style.EmailImage src={ImageValidEmail} alt="ImageUser" />
            <style.TitleVerifyEmail>
              Vous êtes connectée !
            </style.TitleVerifyEmail>
            <style.ParagraphVerifyEmail>
              Vous pouvez maintenant profiter de notre site à votre bon plaisir
              !
            </style.ParagraphVerifyEmail>
            <style.TextVerifyEmail>Allez à l'accueil</style.TextVerifyEmail>
            <style.BtnInscription
              sx={{ mt: 2 }}
              variant="contained"
              onClick={changePageAccueil}
            >
              Accueil
            </style.BtnInscription>
          </style.BoxEmail>
        </style.CardInscriptionPage>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <style.CardInscriptionPage>
          <style.BoxEmail>
            <style.EmailImage src={ImageVerifyEmail} alt="ImageUser" />
            <style.TitleVerifyEmail>
              Modifier son mot de passe !
            </style.TitleVerifyEmail>
            <style.ParagraphVerifyEmail>
              Rentrez votre adresse mail pour pouvoir modifier votre mot de
              passe.
            </style.ParagraphVerifyEmail>
            <style.TextVerifyEmail>
              Entrez votre adresse mail
            </style.TextVerifyEmail>
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
            <style.BtnBoxParent>
              <style.BtnBox>
                <style.BtnInscription
                  variant="contained"
                  onClick={handleSendEmail}
                >
                  Email envoyé
                </style.BtnInscription>
              </style.BtnBox>
            </style.BtnBoxParent>
          </style.BoxEmail>
        </style.CardInscriptionPage>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <style.CardInscriptionPage>
          <style.BoxEmail>
            <style.EmailImage src={ImageVerifyEmail} alt="ImageUser" />
            <style.TitleVerifyEmail>
              Modifier son mot de passe !
            </style.TitleVerifyEmail>
            <style.ParagraphVerifyEmail>
              Rentrez votre adresse mail pour pouvoir modifier votre mot de
              passe.
            </style.ParagraphVerifyEmail>
            <style.TextVerifyEmail>
              Entrez votre adresse mail
            </style.TextVerifyEmail>
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
                  Email envoyé
                </style.BtnInscription>
              </style.BtnBox>
            </style.BtnBoxParent>
          </style.BoxEmail>
        </style.CardInscriptionPage>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <style.CardInscriptionPage>
          <style.BoxEmail>
            <style.EmailImage src={ImageVerifyEmail} alt="ImageUser" />
            <style.TitleVerifyEmail>
              Modifiez votre mot de passe !
            </style.TitleVerifyEmail>
            <style.TextVerifyEmail>
              Entrez votre nouveau mot de passe
            </style.TextVerifyEmail>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              placeholder="Mot de passe"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              sx={{ "& input": { height: "10px" } }}
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              placeholder="Confirmez votre mot de passe"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              onChange={handleChange}
              sx={{ "& input": { height: "10px" } }}
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
            <style.BtnBoxParent>
              <style.BtnBox>
                <style.BtnInscription
                  variant="contained"
                  onClick={handleUpdatePassword}
                >
                  Modifier
                </style.BtnInscription>
              </style.BtnBox>
            </style.BtnBoxParent>
          </style.BoxEmail>
        </style.CardInscriptionPage>
      </TabPanel>
    </style.InscriptionPage>
  );
};

export default Connection;
