import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const verifyEmailCode = {
    verifyEmail(profile) {
      return axios.post(`${BASE_URL}/api/verify-email-code`, profile, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };
  
export { verifyEmailCode };
