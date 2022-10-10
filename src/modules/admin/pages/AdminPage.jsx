import { AdminLayout } from '../layout/AdminLayout';
import { UserCrud } from '../views';
import { Default } from '../views/Default';
import { JobCrud } from '../views/JobCrud';

export const AdminPage = ({ children }) => {
  return <AdminLayout>{children ? children : <Default />}</AdminLayout>;
};
