import { jobApi } from '../../../api';
import { onLoad } from './';

export const startSearchJobs = () => {
  return async (dispatch) => {
    try {
      const { data } = await jobApi.get('/jobs');
      dispatch(onLoad({ jobs: data.data.data }));
    } catch (error) {
      console.log({ error });
    }
  };
};
