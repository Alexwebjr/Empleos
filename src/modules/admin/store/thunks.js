import { userApi } from '../../../api/';
import {
  onCloseModal,
  onDelete,
  onEdit,
  onError,
  onLoad,
  onSave,
} from './userSlice';

const setRoleName = (user) => {
  user.roleName = user.role.name;
};

export const startSearchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: dataU } = await userApi.get('/users');
      const { data: dataR } = await userApi.get('/roles');
      let users = dataU.data.data;

      users.forEach((u) => {
        setRoleName(u);
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
        setRoleName(user); //set Role Name
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
      setRoleName(user); //set Role Name
      console.log(user);
      delete user.password;
      delete user.passwordChangedAt;
      delete user.passwordResetToken;
      delete user.passwordResetExpires;
      console.log(user);

      if (response.status == 'success') {
        dispatch(onEdit(user));
      }
    } catch (error) {
      dispatch(onError(error.response.data.message));
    }
  };
};

export const startDeleteUser = (userId) => {
  return async (dispatch) => {
    try {
      //const { data: response } = await userApi.delete('/users/' + userId);
      //dispatch(onDelete({ userId }));

      //Update state
      const { data: response } = await userApi.patch('/users/' + userId, {
        status: false,
      });
      dispatch(onEdit(user));
    } catch (error) {
      dispatch(onError(error.message));
    }
  };
};
