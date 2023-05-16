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
} from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';
import { startAddUser, startUpdateUser } from '../store/thunks';
import { onCloseModal, onOpenModal } from '../store/adminSlice';

export const UserModalForm = () => {
  //Store
  const { roles, openModal, activeUser } = useSelector((state) => state.admin);
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
    setFormState,
    onInputChange,
    onCheckChange,
    onResetForm,
  } = useForm({
    userName: activeUser.userName,
    password: '',
    fullName: activeUser.fullName,
    email: activeUser.email,
    roleId: activeUser.roleId,
    status: activeUser.status,
  });

  //activeUser Changed Modify Form
  React.useEffect(() => {
    setFormState({
      userName: activeUser.userName,
      password: '',
      fullName: activeUser.fullName,
      email: activeUser.email,
      roleId: activeUser.roleId !== undefined ? activeUser.roleId : '',
      status: activeUser.status === true ? true : false,
    });
  }, [activeUser]);

  //Events Object
  const eventsLibrary = {
    add: async (event) => {
      event.preventDefault();
      await dispatch(
        startAddUser({ userName, password, fullName, email, roleId, status })
      );
    },
    edit: async () => {
      dispatch(onCloseModal());
      await dispatch(
        startUpdateUser({
          id: activeUser.id,
          userName,
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
        ADD NEW
      </Button>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>USER MODAL FORM</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {/*FORM */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item sm={12} md={6}>
              <TextField
                id="userName"
                label="UserName"
                name="userName"
                variant="filled"
                value={userName}
                onChange={onInputChange}
              />
            </Grid>

            {/*Conditional Rendering */}
            {Object.keys(activeUser).length === 0 && (
              <Grid item sm={12} md={6}>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  name="password"
                  variant="filled"
                  value={password}
                  onChange={onInputChange}
                />
              </Grid>
            )}

            <Grid item sm={12}>
              <TextField
                id="fullName"
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
                id="email"
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
                  labelId="LabelroleId"
                  id="roleId"
                  name="roleId"
                  value={roleId}
                  defaultValue={activeUser.roleId}
                  onChange={onInputChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {/*Roles */}
                  {roles.length > 0 &&
                    roles.map((rol, i) => {
                      return (
                        <MenuItem key={i} value={rol.id}>
                          {rol.name}
                        </MenuItem>
                      );
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
              Object.keys(activeUser).length === 0
                ? eventsLibrary['add']
                : eventsLibrary['edit']
            }
            color="success"
            variant="contained"
            endIcon={<Save />}
            sx={{ width: '100%' }}
          >
            {Object.keys(activeUser).length === 0 ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
