import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const infoPerso = {
  userInfoPerso(profile) {
    return axios.post(`${BASE_URL}/api/info-perso`, profile);
  }
};

export { infoPerso };
