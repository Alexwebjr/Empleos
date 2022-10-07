import { AdminLayout } from '../layout/AdminLayout';
import { Crud } from '../views/Crud';
import { Default } from '../views/Default';

export const AdminPage = () => {
  return (
    <AdminLayout>
      <Crud />
    </AdminLayout>
  );
};
