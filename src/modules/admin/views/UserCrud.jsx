import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSearchUsers } from '../store/thunks';
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
} from '@mui/material';

const columns = [
  {
    field: 'id',
    headerName: '#',
    width: 60,
    editable: false,
  },
  {
    field: 'userName',
    headerName: 'UserName',
    width: 150,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 150,
    editable: false,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
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
    getActions: () => [<EditIcon />, <DeleteIcon />],
  },
];

//Users
const rows = [
  {
    id: 1,
    userName: 'jSnow',
    fullName: 'Jon Snow',
    role: 'User',
    email: 'email@email.com',
    status: true,
  },
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

  const onMsg = (type, title = 'Notification', msg) => {
    MySwal.fire({
      icon: type,
      title: title,
      text: 'Happy to see you again ' + msg,
      footer: '<a href="">Why do I have this issue?</a>',
    });
  };
  const handleRowClick = (params) => {
    setMessage(`User name: "${params.row.firstName}" clicked`);
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
          <FormBox title="Adding new User">
            <Grid item sm={12} md={6}>
              <TextField
                id="filled-basic"
                label="First Name"
                variant="filled"
              />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField id="filled-basic" label="Last Name" variant="filled" />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField id="filled-basic" label="User" variant="filled" />
            </Grid>

            <Grid item sm={12} md={6}>
              <TextField id="filled-basic" label="Password" variant="filled" />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="filled-basic"
                label="Email"
                variant="filled"
                sx={{ width: '100%' }}
              />
            </Grid>

            <Grid item sm={12}>
              <FormControl variant="filled" sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Rol
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={role}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>User</MenuItem>
                  <MenuItem value={20}>Editor</MenuItem>
                  <MenuItem value={30}>Admin</MenuItem>
                </Select>
              </FormControl>
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
