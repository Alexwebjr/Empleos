import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormBox, ModalBox } from '../../../components';
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
} from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { startAddUser } from '../store/thunks';
import { onCloseModal, onOpenModal } from '../store/userSlice';

export const UserModalForm = ({ btnTitle, title, type }) => {
  //Store
  const { roles, active, openModal } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(onOpenModal());
  };

  const handleClose = () => {
    dispatch(onCloseModal());
  };

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
    userName: active.userName,
    password: '',
    fullName: active.fullName,
    email: active.email,
    roleId: active.roleId,
    status: active.status,
  });

  //Events
  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(
      startAddUser({ userName, password, fullName, email, roleId, status })
    );
  };

  //Events Object
  const eventsLibrary = {
    add: async (event) => {
      event.preventDefault();
      await dispatch(
        startAddUser({ userName, password, fullName, email, roleId, status })
      );
    },
    edit: async () => {
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
    },
    demoAdd: () => {
      console.log('Adding');
      dispatch(onCloseModal());
    },
    demoEdit: () => {
      console.log('Editing');
      dispatch(onCloseModal());
    },
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {btnTitle}
      </Button>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          {/*FORM */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
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
            onClick={eventsLibrary[type]}
            color="success"
            variant="contained"
            endIcon={<Save />}
            sx={{ width: '100%' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
