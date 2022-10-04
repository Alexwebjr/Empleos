import { Navigate, Route, Routes } from 'react-router-dom';
import { JodListPage, JodPage } from '../pages';

export const JodRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<JodListPage />} />
      <Route path="/:id" element={<JodPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
