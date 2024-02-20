import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const userAdmin = {
  getUserAdmin() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL}/api/admin-user`, { headers });
  },
};

export { userAdmin };
