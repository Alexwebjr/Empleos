import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../../hooks/';
import {
  onClearErrorMessage,
  startCheking,
  startGoogleSignIn,
  startLogin,
} from '../store';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { sweetAlert } from '../../../helpers/sweetAlert';
import { Loading } from '../../../components/Loading';

export const LoginPage = () => {
  //Calling Store
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  //ErrorMessage
  useEffect(() => {
    if (errorMessage !== undefined) {
      sweetAlert['onMsg'](errorMessage);
      dispatch(onClearErrorMessage); //reset
    }
  }, [errorMessage]);

  const { email, password, onInputChange, onResetForm } = useForm({
    email: 'admin@email.com',
    password: '12345678',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(startLogin(email, password));
  };

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSignIn());
  };

  return (
    <>
      <Loading />
      <AuthLayout title="Login">
        <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="email@google.com"
                name="email"
                value={email}
                onChange={onInputChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Password"
                type="password"
                placeholder="*******"
                name="password"
                value={password}
                onChange={onInputChange}
                fullWidth
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isAuthenticating}
                >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticating}
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>
    </>
  );
};
