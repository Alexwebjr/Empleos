import { adminApi } from '../../../api/';
import { convertDateFormat } from '../../../helpers';
import { onLoading } from '../../auth/store';
import {
  onDeleteJob,
  onDeleteUser,
  onEdit,
  onError,
  onLoadAds,
  onLoadJobs,
  onLoadUsers,
  onSave,
} from './adminSlice';

const setRoleName = (user) => {
  user.roleName = user.role.name;
};

//READING
export const startLoadingUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: dataU } = await adminApi.get('/users');
      const { data: dataR } = await adminApi.get('/roles');
      let users = dataU.data.data;
      const roles = dataR.data.data;

      users.forEach((u) => {
        setRoleName(u);
      });

      console.log(users);

      dispatch(onLoadUsers({ users, roles }));
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startLoadingJobs = () => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data } = await adminApi.get('/jobs');
      const jobs = convertDateFormat(data.data.data);

      dispatch(onLoadJobs({ jobs }));
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startLoadingAds = () => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data } = await adminApi.get('/ads');
      const ads = data.data.data;

      dispatch(onLoadAds({ ads }));
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

//CREATE
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

//TODO:
export const startAddJob = (newJob) => {
  return async (dispatch) => {
    try {
      console.log(newJob);
      // dispatch(onLoading(true));
      // const { data: response } = await adminApi.post('/jobs', newJob);
      // if (response.status == 'success') {
      //   const job = response.data.data;
      //   dispatch(onSave({ job }));
      // }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

//UPDATE
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

//DELETE
export const startDeleteUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      //const { data: response } = await adminApi.delete('/users/' + userId);
      //dispatch(onDeleteUser({ userId }));

      //Update state
      const { data: response } = await adminApi.patch('/users/' + userId, {
        status: false,
      });

      if (response.status == 'success') {
        dispatch(onDeleteUser(userId));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startDeleteJob = (jobId) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));

      //Update state
      const { data: response } = await adminApi.patch('/jobs/' + jobId, {
        status: false,
      });

      if (response.status == 'success') {
        dispatch(onDeleteJob(jobId));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};
