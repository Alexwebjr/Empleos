import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks';

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { startAddAd, startUpdateAd } from '../store/thunks';
import { onCloseModal, onOpenModal } from '../store/adminSlice';
import { GridCloseIcon } from '@mui/x-data-grid';

export const AdModalForm = () => {
  //Store
  const { users, activeAd, openModal } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(onOpenModal());
  };

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  //Form
  const {
    description,
    content,
    userId,
    status,
    setFormState,
    onInputChange,
    onCheckChange,
    onResetForm,
  } = useForm({
    description: activeAd.description,
    content: activeAd.content,
    userId: activeAd.userId,
    status: activeAd.status,
  });

  //activeAd Changed Modify Form
  React.useEffect(() => {
    setFormState({
      description: activeAd.description,
      content: activeAd.content,
      userId: activeAd.userId,
      status: activeAd.status,
    });
  }, [activeAd]);

  //Events Object
  const eventsLibrary = {
    add: async (event) => {
      event.preventDefault();
      await dispatch(
        startAddAd({
          description,
          content,
          userId,
          status,
        })
      );
    },
    edit: async () => {
      dispatch(onCloseModal());
      await dispatch(
        startUpdateAd({
          id: activeAd.id,
          description,
          content,
          userId,
          status,
        })
      );
    },
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD NEW
      </Button>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>AD MODAL FORM</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {/*FORM */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/*description */}
            <Grid item sm={12}>
              <TextField
                id="description"
                label="Description"
                name="description"
                variant="filled"
                sx={{ width: '100%' }}
                value={description}
                onChange={onInputChange}
              />
            </Grid>

            {/* Content */}
            <Grid item sm={12}>
              <TextField
                id="content"
                label="Content"
                name="content"
                variant="filled"
                sx={{ width: '100%' }}
                value={content}
                onChange={onInputChange}
                multiline
                rows={4}
              />
            </Grid>

            {/*User Select */}
            <Grid item sm={12}>
              <FormControl variant="filled" sx={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-filled-label">
                  User
                </InputLabel>
                <Select
                  labelId="LabeluserId"
                  id="userId"
                  name="userId"
                  value={userId}
                  defaultValue={activeAd.userId}
                  onChange={onInputChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/*Users */}
                  {users.length > 0 &&
                    users.map((user, i) => {
                      return (
                        <MenuItem key={i} value={user.id}>
                          {user.fullName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Grid>

            {/*Check status */}
            <Grid item sm={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Status"
                  id="status"
                  name="status"
                  checked={status}
                  //onClick={onChangeStatus}
                  onChange={onCheckChange}
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="error"
            endIcon={<Cancel />}
            sx={{ width: '100%' }}
          >
            Cancel
          </Button>
          <Button
            onClick={
              Object.keys(activeAd).length === 0
                ? eventsLibrary['add']
                : eventsLibrary['edit']
            }
            color="success"
            variant="contained"
            endIcon={<Save />}
            sx={{ width: '100%' }}
          >
            {Object.keys(activeAd).length === 0 ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
