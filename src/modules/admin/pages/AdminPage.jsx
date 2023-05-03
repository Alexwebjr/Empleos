import * as React from 'react';
import { useDispatch } from 'react-redux';
import { startLoadingData } from '../store/thunks';
import { AdminLayout } from '../layout/AdminLayout';
import { UserCrud } from '../views';
import { Default } from '../views/Default';
import { JobCrud } from '../views/JobCrud';

export const AdminPage = ({ children }) => {
  //Calling data
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startLoadingData());
  }, []);

  return <AdminLayout>{children ? children : <Default />}</AdminLayout>;
};
