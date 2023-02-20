//import { parseISO } from 'date-fns';

export const convertDateFormat = (jobs = []) => {
  return jobs.map((job) => {
    job.createdAt = job.createdAt.slice(0, 10);
    job.updatedAt = job.updatedAt.slice(0, 10);
    return job;
  });
};
