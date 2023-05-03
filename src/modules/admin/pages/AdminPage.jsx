import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingData } from '../store/thunks';
import { sweetAlert } from '../../../helpers/sweetAlert';
import { onClearErrorMessage } from '../store/adminSlice';
import { AdminLayout } from '../layout/AdminLayout';
import { Default } from '../views/Default';
import { UserCrud } from '../views';
import { JobCrud } from '../views/JobCrud';

export const AdminPage = ({ children }) => {
  //Calling data
  const { errorMessage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(startLoadingData());
  }, []);

  //ErrorMessage
  React.useEffect(() => {
    if (errorMessage !== undefined) {
      sweetAlert['onMsg'](errorMessage);
      dispatch(onClearErrorMessage()); //reset
    }
  }, [errorMessage]);

  return <AdminLayout>{children ? children : <Default />}</AdminLayout>;
};
