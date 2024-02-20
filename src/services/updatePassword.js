import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const updatePassword = {
    updatePwd(profile) {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return axios.post(`${BASE_URL}/api/update-password`, profile, { headers });
    },
};  

export { updatePassword };