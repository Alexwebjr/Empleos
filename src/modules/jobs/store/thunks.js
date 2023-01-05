import { jobApi } from '../../../api';
import { onLoad } from './';

export const searchJobs = () => {
  return async (dispatch) => {
    try {
      const resp = await jobApi.get('/jobs');
      console.log(resp.data);
    } catch (error) {
      console.log({ error });
    }
  };
};
