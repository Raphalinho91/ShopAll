import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const infoBancaire = {
  unserBancaire(profile) {
    return axios.post(`${BASE_URL}/api/info-bancaire`, profile);
  }
};

export { infoBancaire };
