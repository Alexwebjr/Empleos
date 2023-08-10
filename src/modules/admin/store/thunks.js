import { adminApi } from '../../../api/';
import { convertDateFormat, fileUpload } from '../../../helpers';
import { onLoading } from '../../auth/store';
import {
  onDeleteJob,
  onDeleteUser,
  onDeleteAd,
  onEditUser,
  onEditJob,
  onError,
  onLoadAds,
  onLoadJobs,
  onLoadUsers,
  onSaveJob,
  onSaveUser,
  onSaveAd,
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

      ads.forEach((u) => {
        u.userName = u.user?.userName;
      });

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
        dispatch(onSaveUser({ user }));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startAddJob = (newJob) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: response } = await adminApi.post('/jobs', newJob);
      if (response.status == 'success') {
        const job = response.data.data;
        dispatch(onSaveJob({ job }));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

export const startAddAd = (newAd) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: response } = await adminApi.post('/ads', newAd);
      if (response.status == 'success') {
        const ad = response.data.data;
        dispatch(onSaveAd({ ad }));
      }
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
      delete user.password;
      delete user.passwordChangedAt;
      delete user.passwordResetToken;
      delete user.passwordResetExpires;

      if (response.status == 'success') {
        dispatch(onEditUser(user));
      }
    } catch (error) {
      dispatch(onError(error.response.data.message));
    }
    dispatch(onLoading(false));
  };
};

export const startUpdateJob = (jobOld) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: response } = await adminApi.patch(
        '/jobs/' + jobOld.id,
        jobOld
      );

      if (response.status == 'success') {
        const job = convertDateFormat([response.data.data])[0];
        dispatch(onEditJob(job));
      }
    } catch (error) {
      dispatch(onError(error.response.data.message));
    }
    dispatch(onLoading(false));
  };
};

export const startUpdateAd = (adOld) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));
      const { data: response } = await adminApi.patch(
        '/ads/' + adOld.id,
        adOld
      );

      if (response.status == 'success') {
        const ad = convertDateFormat([response.data.data])[0];
        dispatch(onEditAd(ad));
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

export const startDeleteAd = (adId) => {
  return async (dispatch) => {
    try {
      dispatch(onLoading(true));

      //Update state
      const { data: response } = await adminApi.patch('/ads/' + adId, {
        status: false,
      });

      if (response.status == 'success') {
        dispatch(onDeleteAd(adId));
      }
    } catch (error) {
      dispatch(onError(error.message));
    }
    dispatch(onLoading(false));
  };
};

//UPLOAD
export const startUploadingFile = (files = []) => {
  return async (dispatch) => {
    try {
      //dispatch(onLoading(true));
      const imgUrl = await fileUpload(files[0]); //just 1
      return imgUrl;
    } catch (error) {
      console.log({ error });
    }
  };
};
