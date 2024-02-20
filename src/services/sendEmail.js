import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const sendEmail = {
  sendUser(profile) {
    return axios.post(`${BASE_URL}/api/send-email`, profile);
  }
};

export { sendEmail };
