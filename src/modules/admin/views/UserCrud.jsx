import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks';
import {
  startAddUser,
  startDeleteUser,
  startSearchUsers,
  startUpdateUser,
} from '../store/thunks';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormBox, ModalBox } from '../../../components';
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
import { Cancel, Save } from '@mui/icons-material';

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
  const [role, setRole] = React.useState('');

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

  //Form
  const {
    userName,
    password,
    fullName,
    email,
    roleId,
    status,
    onInputChange,
    onResetForm,
  } = useForm({
    userName: 'utest',
    password: '12345678',
    fullName: 'User Edited 3',
    email: 'utest5@empleo.com',
    roleId: 4,
    status: false,
  });

  //const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      startAddUser({ userName, password, fullName, email, roleId, status })
    );
  };

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
          onClick={() => onEdit(params.row.id)}
        />,
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={() => onDelete(params.row.id)}
        />,
      ],
    },
  ];

  const onEdit = async (userId) => {
    console.log('clicked');
    await dispatch(
      startUpdateUser({
        id: userId,
        userName,
        password,
        fullName,
        email,
        roleId,
        status,
      })
    );
    setMessage(`User name: "${userId}" edited`);
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
        <ModalBox btnText="Add new">
          <FormBox title="Adding new User" onSave={onSubmit}>
            <Grid item sm={12} md={6}>
              <TextField
                id="filled-basic"
                label="UserName"
                name="userName"
                variant="filled"
                value={userName}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField
                id="filled-basic"
                label="Password"
                name="password"
                variant="filled"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="filled-basic"
                label="Full Name"
                name="fullName"
                variant="filled"
                sx={{ width: '100%' }}
                value={fullName}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="filled-basic"
                label="Email"
                name="email"
                variant="filled"
                sx={{ width: '100%' }}
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            {/*Select */}
            <Grid item sm={12}>
              <FormControl variant="filled" sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Rol
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="roleId"
                  value={roleId}
                  //onChange={handleChange}
                  onChange={onInputChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/*Roles */}
                  {roles.length > 0 &&
                    roles.map((rol) => {
                      return <MenuItem value={rol.id}>{rol.name}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            </Grid>
            {/*Check */}
            <Grid item sm={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Status"
                  name="status"
                  value={status}
                  onChange={onInputChange}
                />
              </FormGroup>
            </Grid>
            {/*Buttons */}
            <Grid item sm={12} md={6}>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: '100%' }}
                startIcon={<Cancel />}
              >
                Cancel
              </Button>
            </Grid>

            <Grid item sm={12} md={6}>
              <Button
                variant="contained"
                color="success"
                endIcon={<Save />}
                sx={{ width: '100%' }}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Grid>
          </FormBox>
        </ModalBox>
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
