import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../modules/auth/routes/AuthRoutes';
import { JodRoutes } from '../modules/jods/routes/JodRoutes';
//import { AdminRoutes } from '../modules/admin/routes/';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Login / Register */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Admin / Dashboard 
      <Route path="/admin/*" element={<AdminRoutes />} />
*/}
      {/* Jod */}
      <Route path="/*" element={<JodRoutes />} />
    </Routes>
  );
};
