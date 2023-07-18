import * as React from 'react';
import { useSelector } from 'react-redux';
import { JobViewDetails, NotActiveJob } from '../components/';

export const JobView = () => {
  //Store
  const { active } = useSelector((state) => state.job);

  if (active) {
    return (
      <>
        <JobViewDetails job={active} />
      </>
    );
  } else {
    return (
      <>
        <NotActiveJob />
      </>
    );
  }
};
