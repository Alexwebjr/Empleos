import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Typography } from '@mui/material';

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
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    type: 'actions',
    width: 100,
    getActions: () => [<EditIcon />, <DeleteIcon />],
  },
];

const rows = [
  {
    id: 1,
    userName: 'user',
    lastName: 'Snow',
    firstName: 'Jon',
    email: 'email@email.com',
  },
  {
    id: 2,
    userName: 'user',
    lastName: 'Lannister',
    firstName: 'Cersei',
    email: 'email@email.com',
  },
  {
    id: 3,
    userName: 'user',
    lastName: 'Lannister',
    firstName: 'Jaime',
    email: 'email@email.com',
  },
  {
    id: 4,
    userName: 'user',
    lastName: 'Stark',
    firstName: 'Arya',
    email: 'email@email.com',
  },
  {
    id: 5,
    userName: 'user',
    lastName: 'Targaryen',
    firstName: 'Daenerys',
    email: 'email@email.com',
  },
  {
    id: 6,
    userName: 'user',
    lastName: 'Melisandre',
    firstName: null,
    email: 'email@email.com',
  },
  {
    id: 7,
    userName: 'user',
    lastName: 'Clifford',
    firstName: 'Ferrara',
    email: 'email@email.com',
  },
  {
    id: 8,
    userName: 'user',
    lastName: 'Frances',
    firstName: 'Rossini',
    email: 'email@email.com',
  },
  { id: 9, userName: 'user', lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const Crud = () => {
  const [message, setMessage] = React.useState('');

  const handleRowClick = (params) => {
    setMessage(`User name: "${params.row.firstName}" clicked`);
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {/*TITLE */}
      <Typography variant="h2" gutterBottom padding={2}>
        Users
      </Typography>
      {/*DATA GRID */}
      <DataGrid
        rows={rows}
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
