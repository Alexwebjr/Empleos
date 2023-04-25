import { userApi } from '../../../api/';
import { onDelete, onEdit, onError, onLoad, onSave } from './userSlice';

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

export const startAddUser = (newUser) => {
  return async (dispatch) => {
    try {
      const { data: response } = await userApi.post('/users', newUser);
      if (response.status == 'success') {
        const user = response.data.data;
        dispatch(onSave({ user }));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
  };
};

export const startUpdateUser = (userOld) => {
  return async (dispatch) => {
    try {
      const { data: response } = await userApi.patch(
        '/users/' + userOld.id,
        userOld
      );
      const user = response.data.data;

      if (response.status == 'success') {
        dispatch(onEdit(user));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
  };
};

export const startDeleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data: response } = await userApi.delete('/users/' + userId);
      //Update state
      //const { data: response } = await userApi.delete('/users' + userId, {status: false,
      dispatch(onDelete({ userId }));
    } catch (error) {
      dispatch(onError(error.message));
    }
  };
};
