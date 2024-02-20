import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const adresseUser = {
  userAdresse(profile) {
    return axios.post(`${BASE_URL}/api/adresse`, profile);
  }
};

export { adresseUser };
