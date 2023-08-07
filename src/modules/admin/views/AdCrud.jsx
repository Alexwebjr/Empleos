import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeleteAd, startLoadingAds } from '../store/thunks';
import { onActiveAd, onOpenModal } from '../store/adminSlice';
import { AdModalForm } from '../components/AdModalForm';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormBox, ModalBox } from '../../../components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
import { sweetAlert } from '../../../helpers/sweetAlert';
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

export const AdCrud = () => {
  //Store
  const { ads } = useSelector((state) => state.admin);
  const [message, setMessage] = React.useState('');
  const dispatch = useDispatch();

  //Calling data
  React.useEffect(() => {
    dispatch(startLoadingAds());
  }, []);

  //AdGrid Columns
  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 60,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
      editable: false,
    },
    {
      field: 'content',
      headerName: 'Content',
      width: 150,
      editable: false,
    },
    {
      field: 'userName',
      headerName: 'User',
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

  const handleRowClick = (params) => {
    setMessage(`Ad "${params.row.description}" clicked`);
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const onEdit = async (ad) => {
    const { id, description, content, userId, status } = ad;
    dispatch(
      onActiveAd({
        id,
        description,
        content,
        userId,
        status,
      })
    );
    dispatch(onOpenModal());
  };

  const onDelete = async (adId) => {
    const callback = async (adId) => {
      await dispatch(startDeleteAd(adId));
      Swal.fire('Deleted!', 'Ad has been deleted.', 'success');
    };
    sweetAlert['onConfirm'](
      () => callback(adId),
      'Seguro?',
      'Quieres borrar esta Ad?'
    );
  };

  return (
    <>
      <Box sx={{ height: 400, width: '100%' }}>
        {/*TITLE */}
        <Typography variant="h2" gutterBottom>
          Ads
        </Typography>
        {/*MODAL FORM*/}
        <Grid item textAlign="end" paddingRight={3} paddingBottom={3}>
          <AdModalForm />
        </Grid>
        {/*DATA GRID */}
        <DataGrid
          rows={ads}
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
