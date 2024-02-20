import axiosInstance from './axiosInstance';

const verifyResetEmail = {
  verifyEmailPassword(profile) {
    return axiosInstance.post('/api/verify-password-code', profile);
  }
};

export { verifyResetEmail };
