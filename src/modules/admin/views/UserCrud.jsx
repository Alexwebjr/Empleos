import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startAddUser,
  startDeleteUser,
  startSearchUsers,
  startUpdateUser,
} from '../store/thunks';
import { onActiveUser, onOpenModal } from '../store/userSlice';
import { UserModalForm } from '../components/UserModalForm';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import {
  Alert,
  FormControl,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from '@mui/material';

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
  const { users, roles, active, errorMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [message, setMessage] = React.useState('');

  //Calling users
  React.useEffect(() => {
    dispatch(startSearchUsers());
  }, []);

  //ErrorMessage
  React.useEffect(() => {
    if (errorMessage !== undefined) {
      onMsg('error', 'Error', errorMessage);
    }
  }, [errorMessage]);

  //const isAuthenticating = useMemo(() => status === 'checking', [status]);

  //Msg
  const onMsg = (type, title = 'Notification', msg) => {
    MySwal.fire({
      icon: type,
      title: title,
      text: 'Happy to see you again ' + msg,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  };

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
    //TODO: dispath startUpdateUser
    //TODO: Show Message

    // await dispatch(
    //   startUpdateUser({
    //     id: userId,
    //     userName,
    //     password,
    //     fullName,
    //     email,
    //     roleId,
    //     status,
    //   })
    // );
    //setMessage(`User name: "${userId}" edited`);
  };

  const onDelete = async (userId) => {
    await dispatch(startDeleteUser(userId));
    setMessage(`User name: "${userId}" deleted`);
  };

  const handleRowClick = (params) => {
    setMessage(`User name: "${params.row.fullName}" clicked`);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {/*TITLE */}
      <Typography variant="h2" gutterBottom>
        Users
      </Typography>
      {/*MODAL*/}
      <Grid item textAlign="end" paddingRight={3} paddingBottom={3}>
        {/*Add or Edit*/}
        <UserModalForm
          btnTitle={'Add New'}
          title={'Add new user'}
          type={'demoEdit'}
        />
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
  );
};
