import { jobApi } from '../../../api';
import { convertDateFormat } from '../../../helpers/';
import { onLoad } from './';

export const startSearchJobs = () => {
  return async (dispatch) => {
    try {
      const { data } = await jobApi.get('/jobs');
      const jobs = convertDateFormat(data.data.data);
      dispatch(onLoad({ jobs }));
    } catch (error) {
      console.log({ error });
    }
  };
};
