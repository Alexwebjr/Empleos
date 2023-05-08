import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingJobs } from '../store/thunks';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormBox, ModalBox } from '../../../components';

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

const rows = [
  {
    id: 1,
    userName: 'jSnow',
    role: 'User',
    lastName: 'Snow',
    firstName: 'Jon',
    email: 'email@email.com',
  },
  {
    id: 2,
    userName: 'cLannister',
    role: 'Editor',
    lastName: 'Lannister',
    firstName: 'Cersei',
    email: 'email@email.com',
  },
  {
    id: 3,
    userName: 'jLannister',
    role: 'User',
    lastName: 'Lannister',
    firstName: 'Jaime',
    email: 'email@email.com',
  },
  {
    id: 4,
    userName: 'aStark',
    role: 'User',
    lastName: 'Stark',
    firstName: 'Arya',
    email: 'email@email.com',
  },
  {
    id: 5,
    userName: 'dTargaryen',
    role: 'Admin',
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    email: 'email@email.com',
  },
  {
    id: 6,
    userName: 'Meli',
    role: 'User',
    lastName: 'Melisandre',
    firstName: null,
    email: 'email@email.com',
  },
  {
    id: 7,
    userName: 'fClifford',
    role: 'User',
    lastName: 'Clifford',
    firstName: 'Ferrara',
    email: 'email@email.com',
  },
  {
    id: 8,
    userName: 'rFrances',
    role: 'Editor',
    lastName: 'Frances',
    firstName: 'Rossini',
    email: 'email@email.com',
  },
  {
    id: 9,
    userName: 'hRoxie',
    role: 'Admin',
    lastName: 'Roxie',
    firstName: 'Harvey',
    age: 65,
  },
];

export const JobCrud = () => {
  //Store
  const { jobs } = useSelector((state) => state.admin);
  const [message, setMessage] = React.useState('');
  const [role, setRole] = React.useState('');
  const dispatch = useDispatch();

  //Calling data
  React.useEffect(() => {
    dispatch(startLoadingJobs());
  }, []);

  //JobGrid Columns
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 60,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Role',
      width: 150,
      editable: false,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 150,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
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
        Jobs
      </Typography>
      {/*MODAL*/}
      <Grid item textAlign="end" paddingRight={3} paddingBottom={3}>
        <ModalBox btnText="Add new">
          {/*FORM*/}
          <FormBox title="Adding new Job">
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
        rows={jobs}
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
