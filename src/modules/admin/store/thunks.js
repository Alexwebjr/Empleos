import { userApi } from '../../../api/';
import { onError, onLoad } from './userSlice';

export const startSearchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await userApi.get('/users');
      const users = data.data.data;
      dispatch(onLoad({ users }));
    } catch (error) {
      dispatch(onError(error.message));
    }
  };
};
