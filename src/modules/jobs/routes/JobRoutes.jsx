import { Navigate, Route, Routes } from 'react-router-dom';
import { JobPage } from '../pages';

export const JobRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/jobs/:id" element={<JobPage />} />
        <Route path="/*" element={<Navigate to="/jobs" />} />
      </Routes>
    </>
  );
};
