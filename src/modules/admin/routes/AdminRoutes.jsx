import { Route, Routes } from 'react-router-dom';
import { AdminPage } from '../pages';
import { UserCrud } from '../views';
import { JobCrud } from '../views/JobCrud';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/jobs" element={<JobCrud />} />
      <Route path="/user" element={<UserCrud />} />
      <Route path="/*" element={<AdminPage />} />
    </Routes>
  );
};
