import axiosInstance from './axiosInstance';

const connection = {
  connectUser(profile) {
    return axiosInstance.post('/api/signin', profile);
  }
};

export { connection };
