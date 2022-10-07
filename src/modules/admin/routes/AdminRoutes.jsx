import { Route, Routes } from 'react-router-dom';
import { AdminPage } from '../pages';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminPage />} />
    </Routes>
  );
};
