import { userApi } from '../../../api/';
import { onError, onLoad } from './userSlice';

export const startSearchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: dataU } = await userApi.get('/users');
      const { data: dataR } = await userApi.get('/roles');
      let users = dataU.data.data;

      users.forEach((u) => {
        u.roleName = u.role.name;
      });

      console.log(users);
      const roles = dataR.data.data;

      dispatch(onLoad({ users, roles }));
    } catch (error) {
      dispatch(onError(error.message));
    }
  };
};
