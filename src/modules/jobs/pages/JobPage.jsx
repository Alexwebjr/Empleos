import { JobLayout } from '../layout/JobLayout';
import { JobView, Default } from '../views';

export const JobPage = () => {
  return (
    <>
      <JobLayout>
        <JobView />
        {/* <Default /> */}
      </JobLayout>
    </>
  );
};
