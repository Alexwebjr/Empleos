import { jobApi } from '../../../api';
import { onCheckingCredentials, onLogin } from './';

export const startCheking = () => {
  return async (dispatch) => {
    dispatch(onCheckingCredentials());

    //const token = localStorage.getItem('jobToken');
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      //console.log(email, password);
      const resp = await jobApi.post('/auth/login', { email, password });
      console.log(resp);
      // localStorage.setItem('token', resp.token);
      // localStorage.setItem('token-init-date', new Date().getTime());
      // dispatch(onLogin(resp));
    } catch (error) {
      console.log({ error });
    }
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
