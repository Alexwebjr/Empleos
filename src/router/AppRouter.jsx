import { Routes, Route } from 'react-router-dom';
import { AdminRoutes } from '../modules/admin/routes/AdminRoutes';
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes';
import { JobRoutes } from '../modules/jobs/routes/JobRoutes';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login / Register */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Admin / Dashboard */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* Jod */}
      <Route path="/*" element={<JobRoutes />} />
    </Routes>
  );
};
