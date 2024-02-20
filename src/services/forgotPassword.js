import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const forgotPassword = {
  forgotPwd(profile) {
    return axios.post(`${BASE_URL}/api/send-verification-email-password`, profile);
  }
};

export { forgotPassword };
