import { jobApi } from '../../../api';
import { convertDateFormat } from '../../../helpers/';
import { onLoading } from '../../auth/store';
import { onLoad } from './';

export const startSearchJobs = () => {
  return async (dispatch) => {
    try {
      const { data } = await jobApi.get('/jobs');
      const jobs = convertDateFormat(data.data.data);
      dispatch(onLoad({ jobs }));
      dispatch(onLoading(false));
    } catch (error) {
      console.log({ error });
    }
  };
};
