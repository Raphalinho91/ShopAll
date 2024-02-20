import { configureStore } from '@reduxjs/toolkit';
import InscriptionSlice from './slice/inscription';
import VerifyEmailSlice from './slice/verifyEmail';
import ConnectionSlice from './slice/connection';
import SendEmailSlice from './slice/sendEmail';
import UserInfoSlice from './slice/userInfo';
import SendEmailPasswordSlice from './slice/forgotPassword';
import VerifyEmailPasswordSlice from './slice/verifyResetPwd';
import UpdatePasswordSlice from './slice/updatePassword';
import AdresseSlice from './slice/adresseUser';
import InfoBancaireSlice from './slice/infoBancaire';
import InfoPersoSlice from './slice/infoPerso';
import UserAdminSlice from './slice/AdminUser';
import InfoAllUsersSlice from './slice/allInfoUser';
import deleteOneUserSlice from './slice/deleteOneUser';

const store = configureStore({
  reducer: {
    Inscription: InscriptionSlice,
    VerifyEmail: VerifyEmailSlice,
    Connection: ConnectionSlice,
    SendEmail: SendEmailSlice,
    UserInfo: UserInfoSlice,
    ForgotPassword: SendEmailPasswordSlice,
    VerifyResetPwd: VerifyEmailPasswordSlice,
    UpdatePassword: UpdatePasswordSlice,
    Adresse: AdresseSlice,
    InfoPerso: InfoPersoSlice,
    InfoBancaire: InfoBancaireSlice,
    UserAdmin: UserAdminSlice,
    InfoAllUsers: InfoAllUsersSlice,
    deleteOneUser: deleteOneUserSlice
  },  
});

export default store;
