import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  TextField,
  Typography,
  keyframes,
  styled,
} from "@mui/material";

// incription

export const InscriptionPage = styled(Container)({
  display: "flex",
  minHeight: "97.5vh",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFF",
});

export const CardInscriptionPage = styled(Grid)({
  backgroundColor: "#FFF",
  borderRadius: "10px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  padding: "30px",
  width: "100%",
  gap: "10px",
  display: "flex",
  height: "75vh",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
});

const floatingAnimationTop = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
    100% {
        transform: translateY(0);
    }
`;

const floatingAnimationRight = keyframes`
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(10px);
    }
    100% {
        transform: translateX(0);
    }
`;
const opacityAnimation = keyframes`
  0% {
      opacity: 0,25;
  }
  40% {
      opacity: 0.50;
  }
  60% {
      opacity: 0.75;
  }
  100% {
      opacity: 1;
  }
`;

export const FormeCss = styled(Box)({
  position: "absolute",
  width: "80px",
  top: "18%",
  left: "17%",
  zIndex: 100,
  height: "80px",
  clipPath: "circle(50% at 50% 50%)",
  backgroundColor: "#8F00FF",
  color: "#8F00FF",
  animation: `${floatingAnimationRight} 3s infinite`,
});

export const Forme2Css = styled(Box)({
  position: "absolute",
  width: "70px",
  top: "70%",
  left: "35%",
  zIndex: 100,
  height: "70px",
  clipPath: "circle(50% at 50% 50%)",
  backgroundColor: "#8F00FF",
  color: "#8F00FF",
  animation: `${floatingAnimationRight} 3s infinite`,
});

export const Forme3Css = styled(Box)({
  position: "absolute",
  width: "90px",
  top: "18.5%",
  left: "50%",
  zIndex: 1,
  height: "90px",
  clipPath: "circle(50% at 50% 50%)",
  backgroundColor: "#8F00FF",
  color: "#8F00FF",
  animation: `${floatingAnimationRight} 3s infinite`,
});

export const Forme4Css = styled(Box)({
  position: "absolute",
  width: "40px",
  top: "79%",
  left: "80%",
  zIndex: 1,
  height: "40px",
  clipPath: "circle(50% at 50% 50%)",
  backgroundColor: "#8F00FF",
  color: "#8F00FF",
  animation: `${floatingAnimationRight} 3s infinite`,
});

export const ParentBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  maxWidth: "100%",
  width: "100%",
  height: "100%",
});

export const EnfantBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "50%",
  height: "500px",
});

export const EnfantImage = styled("img")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "65%",
  height: "65%",
  animation: `${floatingAnimationTop} 3s infinite`,
});

export const EnfantInput = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "50%",
  height: "100%",
});

export const TitleInscription = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 700,
  zIndex: 100,
  fontSize: "37px",
  color: "#000",
  "& span": {
    color: "#8F00FF",
    animation: `${opacityAnimation} 2s infinite`,
  },
});

export const TextInscription = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  fontSize: "17px",
  color: "#000",
});

export const BtnInscription = styled(Button)({
  backgroundColor: "#8F00FF",
  color: "#FFF",
  width: "170px",
  "&:hover": {
    backgroundColor: "#8F00FF",
    color: "#FFF",
  },
});

export const BtnAccueil = styled(Button)({
  backgroundColor: "#FFF",
  color: "#8F00FF",
  width: "170px",
  "&:hover": {
    backgroundColor: "#FFF",
    color: "#8F00FF",
  },
});

export const BtnBoxParent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  marginTop: "20px",
});

export const BtnBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

// verify Email

export const TitleVerifyEmail = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 700,
  fontSize: "37px",
  color: "#8F00FF",
});

export const ParagraphVerifyEmail = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 400,
  fontSize: "15px",
  color: "#000",
});

export const TextVerifyEmail = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "17px",
  color: "#8F00FF",
  marginTop: "10px",
  "& span": {
    color: "#8F00FF",
    textTransform: "uppercase",
    animation: `${opacityAnimation} 2s infinite`,
  },
});

export const RowTextfield = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginTop: "10px",
});

export const EmailImage = styled("img")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "30%",
  height: "30%",
  animation: `${floatingAnimationTop} 3s infinite`,
});

export const BoxEmail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

// Profile

export const BoxProfile = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  marginTop: "125px",
});

export const BoxProfileImage = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const BoxAvatar = styled(Avatar)({
  display: "flex",
  width: "130px",
  height: "130px",
  alignItems: "center",
  justifyContent: "center",
});

export const BtnImage = styled(Button)({
  display: "flex",
  width: "100%",
  height: "30px",
  marginTop: "20px",
  color: "#FFF",
  backgroundColor: "#8F00FF",
  "&:hover": {
    color: "#FFF",
    backgroundColor: "#8F00FF",
  },
});

export const InputImage = styled(InputBase)({
  display: "none",
});

export const BoxNom = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "flex-start",
});

export const BoxInfo = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const BoxAdresse = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "30px",
});

export const BoxRow = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});

export const BoxColumn = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});

export const TextNom = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 700,
  fontSize: "35px",
  color: "#000",
  marginTop: "15px",
});

export const TextAdresse = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "20px",
  color: "#000",
  marginTop: "5px",
});

export const TextEmail = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 300,
  fontSize: "15px",
  color: "#000",
  marginLeft: "20px",
});

// Page Admin

export const BoxColumn1 = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: '50px'
});

export const BoxUser = styled(Grid)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
});

export const BoxInformation = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
});

export const BoxButton = styled(Grid)({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
});

export const TextNom1 = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 600,
  fontSize: "18px",
  color: "#000",
});

export const TextInfo = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontWeight: 300,
  fontSize: "15px",
  color: "#000",
});

export const BtnSupp = styled(Button)({
  display: "flex",
  height: "30px",
  width: '30px',
  color: "#FFF",
  backgroundColor: "#8F00FF",
  "&:hover": {
    color: "#FFF",
    backgroundColor: "#8F00FF",
  },
});