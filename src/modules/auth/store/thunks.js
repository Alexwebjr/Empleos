import { jobApi } from '../../../api';
import { onCheckingCredentials, onLogin, onLogout } from './';

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
      const { data } = await jobApi.post('/auth/login', { email, password });
      console.log(data);
      if (data.status == 'success') {
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin(data.data.user));
      }
    } catch (error) {
      console.log({ error });
      dispatch(onLogout(error));
    }
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};
