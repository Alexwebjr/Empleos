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
import {
  startAddJob,
  startUpdateJob,
  startUploadingFile,
} from '../store/thunks';
import { onCloseModal, onOpenModal } from '../store/adminSlice';
import { GridCloseIcon } from '@mui/x-data-grid';

export const JobModalForm = () => {
  //Store
  const { activeJob, openModal } = useSelector((state) => state.admin);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const [isImageSelected, setIsImageSelected] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(onOpenModal());
  };

  const handleClose = () => {
    dispatch(onCloseModal());
  };

  const handleImageUpload = ({ target }) => {
    //save state selectedImage
    setSelectedImages(target.files);

    //show image in form
    const file = target.files[0];
    handleImageChange(URL.createObjectURL(file));
  };

  const handleImageChange = (newUrl) => {
    onInputChange({
      target: { name: 'image', value: newUrl },
    });
  };

  //Form
  const {
    title,
    summary,
    description,
    requirement,
    salary,
    image,
    status,
    setFormState,
    onInputChange,
    onCheckChange,
    onResetForm,
  } = useForm({
    title: activeJob.title,
    summary: activeJob.summary,
    description: activeJob.description,
    requirement: activeJob.requirement,
    salary: activeJob.salary,
    image: activeJob.image,
    status: activeJob.status,
  });

  //activeJob Changed Modify Form
  React.useEffect(() => {
    setFormState({
      title: activeJob.title,
      summary: activeJob.summary,
      description: activeJob.description,
      requirement: activeJob.requirement,
      salary: activeJob.salary,
      image: activeJob.image,
      status: activeJob.status === true ? true : false,
    });
  }, [activeJob]);

  //Events Object
  const eventsLibrary = {
    add: async (event) => {
      event.preventDefault();
      //Send to cloud
      let imageUrl = await dispatch(startUploadingFile(selectedImages));
      //Save JOb
      await dispatch(
        startAddJob({
          title,
          summary,
          description,
          requirement,
          salary,
          image: imageUrl,
          status,
        })
      );
    },
    edit: async () => {
      dispatch(onCloseModal());
      await dispatch(
        startUpdateJob({
          id: activeJob.id,
          title,
          summary,
          description,
          requirement,
          salary,
          image,
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
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD NEW
      </Button>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>JOB MODAL FORM</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          {/*FORM */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/*Image */}
            <Grid item sm={12}>
              {/*Show Image */}
              {image && (
                <div style={{ position: 'relative' }}>
                  <IconButton
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                    onClick={() => {
                      handleImageChange(null);
                    }}
                  >
                    <GridCloseIcon />
                  </IconButton>
                  <img
                    src={image}
                    alt="Selected file"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              )}
              <Grid container justifyContent="flex-end">
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
              </Grid>
            </Grid>

            {/*Title */}
            <Grid item sm={12}>
              <TextField
                id="title"
                label="Title"
                name="title"
                variant="filled"
                sx={{ width: '100%' }}
                value={title}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="summary"
                label="Summary"
                name="summary"
                variant="filled"
                sx={{ width: '100%' }}
                value={summary}
                onChange={onInputChange}
                multiline
                rows={2}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="description"
                label="Description"
                name="description"
                variant="filled"
                sx={{ width: '100%' }}
                value={description}
                onChange={onInputChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item sm={12}>
              <TextField
                id="requirement"
                label="Requirement"
                name="requirement"
                variant="filled"
                sx={{ width: '100%' }}
                value={requirement}
                onChange={onInputChange}
                multiline
                rows={4}
              />
            </Grid>

            {/*Salary */}
            <Grid item sm={12}>
              <TextField
                id="salary"
                label="Salary"
                name="salary"
                variant="filled"
                sx={{ width: '100%' }}
                value={salary}
                onChange={onInputChange}
              />
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
              Object.keys(activeJob).length === 0
                ? eventsLibrary['add']
                : eventsLibrary['edit']
            }
            color="success"
            variant="contained"
            endIcon={<Save />}
            sx={{ width: '100%' }}
          >
            {Object.keys(activeJob).length === 0 ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
