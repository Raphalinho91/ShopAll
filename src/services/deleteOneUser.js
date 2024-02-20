import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const deleteOneUser = {
  userDelete(userId) {
    return axios.delete(`${BASE_URL}/api/delete/${userId}`);
  }
};

export { deleteOneUser };
