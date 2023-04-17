import { jobApi } from '../../../api';
import {
  onCheckingCredentials,
  onLogin,
  onLogout,
  clearErrorMessage,
} from './';

export const startCheking = () => {
  return async (dispatch) => {
    dispatch(onCheckingCredentials());

    //const token = localStorage.getItem('token');
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    try {
      //console.log(email, password);
      const { data } = await jobApi.post('/auth/login', { email, password });

      if (data.status == 'success') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(
          onLogin({
            id: data.data.user.id,
            email: data.data.user.email,
            userName: data.data.user.userName,
          })
        );
      }
    } catch (error) {
      console.log('c2', error.message);

      dispatch(onLogout(error.message));

      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 3000);
    }
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(onLogout());
  };
};
