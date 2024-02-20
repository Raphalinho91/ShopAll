import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const allUsers = {
  getAllUser() {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(`${BASE_URL}/api/allUsers`, { headers });
  },
};

export { allUsers };
