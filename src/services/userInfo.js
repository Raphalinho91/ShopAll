import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const userInfo = {
  getUserInfo() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL}/api/user-info`, { headers });
  },
};

export { userInfo };
