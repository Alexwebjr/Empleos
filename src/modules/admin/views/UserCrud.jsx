import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startAddUser,
  startDeleteUser,
  startSearchUsers,
  startUpdateUser,
} from '../store/thunks';
import {
  onActiveUser,
  onClearErrorMessage,
  onOpenModal,
} from '../store/userSlice';
import { UserModalForm } from '../components/UserModalForm';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { sweetAlert } from '../../../helpers/sweetAlert';

import { Alert, Grid, Typography } from '@mui/material';

//Users demo
const rows = [
  {
    id: 1,
    userName: 'jSnow',
    fullName: 'Jon Snow',
    role: 'User',
    email: 'email@email.com',
    status: true,
  },
];

export const UserCrud = () => {
  //Store
  const { users, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState('');

  //Calling users
  React.useEffect(() => {
    dispatch(startSearchUsers());
  }, []);

  //ErrorMessage
  React.useEffect(() => {
    if (errorMessage !== undefined) {
      sweetAlert['onMsg'](errorMessage);
    }

    dispatch(onClearErrorMessage()); //reset
  }, [errorMessage]);

  //const isAuthenticating = useMemo(() => status === 'checking', [status]);

  //Msg

  //Grid
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 60,
      editable: false,
    },
    {
      field: 'userName',
      headerName: 'User',
      width: 150,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      editable: false,

      width: 200,
    },
    {
      field: 'roleName',
      headerName: 'Role',
      width: 150,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 100,
      getActions: (params) => [
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={() => onEdit(params.row)}
        />,
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(params.row.id)}
        />,
      ],
    },
  ];

  const onEdit = async (user) => {
    const { id, userName, fullName, email, role, roleId, roleName, status } =
      user;
    //console.log(userId);
    dispatch(
      onActiveUser({
        id,
        userName,
        fullName,
        email,
        role,
        roleId,
        roleName,
        status,
      })
    );
    //TODO: Open Modal
    dispatch(onOpenModal());
  };

  const onDelete = async (userId) => {
    const callback = async (userId) => {
      await dispatch(startDeleteUser(userId));
      Swal.fire('Deleted!', 'User has been deleted.', 'success');
    };
    sweetAlert['onConfirm'](
      () => callback(userId),
      'Seguro?',
      'Quieres borrar este usuario?'
    );
  };

  const handleRowClick = (params) => {
    setMessage(`User name: "${params.row.fullName}" clicked`);
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        {/*TITLE */}
        <Typography variant="h2" gutterBottom>
          Users
        </Typography>
        {/*MODAL FORM*/}
        <Grid item textAlign="end" paddingRight={3} paddingBottom={3}>
          <UserModalForm />
        </Grid>
        {/*DATA GRID */}
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onRowClick={handleRowClick}
        />

        {message && <Alert severity="info">{message}</Alert>}
      </Box>
    </>
  );
};
