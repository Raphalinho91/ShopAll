import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const inscription = {
  createUser(profile) {
    return axios.post(`${BASE_URL}/api/signup`, profile);
  }
};

export { inscription };
