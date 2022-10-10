import { Route, Routes } from 'react-router-dom';
import { AdminPage } from '../pages';
import { UserCrud } from '../views/UserCrud';
import { JobCrud } from '../views/JobCrud';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/jobs"
        element={
          <AdminPage>
            <JobCrud />
          </AdminPage>
        }
      />
      <Route
        path="/users"
        element={
          <AdminPage>
            <UserCrud />
          </AdminPage>
        }
      />
      <Route path="/*" element={<AdminPage />} />
    </Routes>
  );
};
