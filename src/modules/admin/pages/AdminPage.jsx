import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sweetAlert } from '../../../helpers/sweetAlert';
import { onClearErrorMessage } from '../store/adminSlice';
import { AdminLayout } from '../layout/AdminLayout';
import { Default } from '../views/Default';

export const AdminPage = ({ children }) => {
  //Calling data
  const { errorMessage } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  //ErrorMessage
  React.useEffect(() => {
    if (errorMessage !== undefined) {
      sweetAlert['onMsg'](errorMessage);
      dispatch(onClearErrorMessage()); //reset
    }
  }, [errorMessage]);

  return (
    <>
      <AdminLayout>{children ? children : <Default />}</AdminLayout>
    </>
  );
};
