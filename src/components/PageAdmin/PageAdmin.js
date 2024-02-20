import React, { useEffect, useState } from "react";
import NavBar from "../navbar/nabvar";
import { Alert, Box, Button, Container, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as style from "../style";
import {
  getUserAdmin,
  selectUserAdmin,
  selectUserAdminError,
  selectUserAdminStatus,
} from "../../redux/slice/AdminUser";
import {
  getInfoAllUsers,
  selectInfoAllUsers,
  selectStatus,
} from "../../redux/slice/allInfoUser";
import { deleteUserById } from "../../redux/slice/deleteOneUser";
import DeleteIcon from "@mui/icons-material/Delete";

const PageAdmin = () => {
  const token = localStorage.getItem("token");
  const hasToken = !!token;
  const dispatch = useDispatch();
  const user = useSelector(selectUserAdmin);
  const status = useSelector(selectUserAdminStatus);
  const error = useSelector(selectUserAdminError);
  const users = useSelector(selectInfoAllUsers);
  const statuss = useSelector(selectStatus);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const deletionSuccess = useSelector(state => state.deleteOneUser.deletionSuccess);

  useEffect(() => {
    if (hasToken) {
      dispatch(getUserAdmin(token));
      dispatch(getInfoAllUsers());
    }
  }, [dispatch, hasToken]);

  useEffect(() => {
    if (deletionSuccess) {
      dispatch(getInfoAllUsers());
    }
  }, [dispatch, deletionSuccess]);
  

  const handleDeleteUser = (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      dispatch(deleteUserById(userId)).then(() => {
        setSnackbarMessage("Utilisateur supprimé avec succès.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      });
    }
  };
  

  const renderErrorMessage = (error) => {
    if (error && typeof error === "object" && error.message) {
      return error.message;
    }
    return error || "Unknown error";
  };

  return (
    <>
      <NavBar />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Container sx={{ marginTop: "80px" }}>
        {status === "loading" && <p>Loading...</p>}
        {status === "succeeded" && user ? (
          <Box>
            <style.BoxProfile>Administrateur</style.BoxProfile>

            {statuss === "succeeded" && users.length > 0 ? (
              users.map((user) => (
                <style.BoxColumn1>
                  <style.BoxUser>
                    <Box
                      key={user._id}
                      sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <style.BoxInformation>
                        <style.TextNom1>
                          {user.firstName} {user.lastName}
                        </style.TextNom1>
                        <style.TextInfo>{user.email}</style.TextInfo>
                        <style.TextInfo>
                          {user.adresse}, {user.ville} - {user.codePostale}
                        </style.TextInfo>
                        <style.TextInfo>
                          {user.pays}, {user.province}
                        </style.TextInfo>
                      </style.BoxInformation>
                      <style.BoxButton>
                        <style.BtnSupp
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <DeleteIcon />
                        </style.BtnSupp>
                      </style.BoxButton>
                    </Box>
                  </style.BoxUser>
                </style.BoxColumn1>
              ))
            ) : (
              <p>Aucun utilisateur trouvé.</p>
            )}
          </Box>
        ) : (
          <p>Vous n'avez pas l'autorisation pour accéder à cette page.</p>
        )}
        {status === "failed" && <p>{renderErrorMessage(error)}</p>}
      </Container>
    </>
  );
};

export default PageAdmin;
