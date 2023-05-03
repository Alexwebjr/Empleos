import { adminApi } from '../../../api/';
import { onLoading } from '../../auth/store';
import {
  onCloseModal,
  onDelete,
  onEdit,
  onError,
  onLoad,
  onSave,
} from './adminSlice';

const setRoleName = (user) => {
  user.roleName = user.role.name;
};

export const startLoadingData = () => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: dataU } = await adminApi.get('/users');
      const { data: dataR } = await adminApi.get('/roles');
      const { data: dataJ } = await adminApi.get('/jobs');
      let users = dataU.data.data;
      const roles = dataR.data.data;
      const jobs = dataJ.data.data;

      users.forEach((u) => {
        setRoleName(u);
      });

      console.log(users);

      dispatch(onLoad({ users, roles, jobs }));
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startAddUser = (newUser) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: response } = await adminApi.post('/users', newUser);
      if (response.status == 'success') {
        const user = response.data.data;
        setRoleName(user); //set Role Name
        dispatch(onSave({ user }));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startUpdateUser = (userOld) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: response } = await adminApi.patch(
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
    dispatch(onLoading(false));
  };
};

export const startDeleteUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      //const { data: response } = await adminApi.delete('/users/' + userId);
      //dispatch(onDelete({ userId }));

      //Update state
      const { data: response } = await adminApi.patch('/users/' + userId, {
        status: false,
      });

      if (response.status == 'success') {
        dispatch(onDelete(userId));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};
