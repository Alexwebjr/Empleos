import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { onLoading } from '../modules/auth/store';

export const Loading = () => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(loading);

  const handleClose = () => {
    dispatch(onLoading(false));
  };

  const openClose = (value) => {
    setOpen(value);
  };

  React.useEffect(() => {
    openClose(loading);
  }, [loading]);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
