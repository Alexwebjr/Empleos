import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminRoutes } from '../modules/admin/routes/AdminRoutes';
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes';
import { JobRoutes } from '../modules/jobs/routes/JobRoutes';

export const AppRouter = () => {
  const { status } = useSelector((state) => state.auth);
  console.log(status);

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<JobRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<JobRoutes />} />
        </>
      )}
    </Routes>
  );
};
