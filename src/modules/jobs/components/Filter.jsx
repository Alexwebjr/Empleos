import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchJobs } from '../store';
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';

export const Filter = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    //Call jobs
    dispatch(searchJobs());
  });

  return (
    <Grid
      container
      justifyContent="space-between"
      height={'100%'}
      overflow="hidden"
    >
      {/* SEARCH */}
      <Grid item sm={12}>
        <Paper
          component="form"
          sx={{
            p: '20px 4px 2px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Job keyword"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>

      {/* Buttons */}
      <Grid item sm={12}>
        <Grid container justifyContent="center">
          <Grid item sm={4} textAlign="center">
            <PaidIcon color="disabled" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item sm={4} textAlign="center">
            <CalendarMonthIcon color="success" sx={{ fontSize: 40 }} />
          </Grid>
          <Grid item sm={4} textAlign="center">
            <WifiProtectedSetupIcon color="disabled" sx={{ fontSize: 40 }} />
          </Grid>
        </Grid>
      </Grid>

      {/*JOB LIST */}
      <Grid item sm={12}>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Job Title"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" ??? I'll be in your neighborhood doing errands this???"}

                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ pt: 1 }}
                  >
                    <Grid item xs={6}>
                      {'$123,000'}
                    </Grid>
                    <Grid item xs={6}>
                      {'Jan 9, 2014'}
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Job Title"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" ??? I'll be in your neighborhood doing errands this???"}

                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ pt: 1 }}
                  >
                    <Grid item xs={6}>
                      {'$123,000'}
                    </Grid>
                    <Grid item xs={6}>
                      {'Jan 9, 2014'}
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Job Title"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" ??? I'll be in your neighborhood doing errands this???"}

                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ pt: 1 }}
                  >
                    <Grid item xs={6}>
                      {'$123,000'}
                    </Grid>
                    <Grid item xs={6}>
                      {'Jan 9, 2014'}
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Job Title"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors
                  </Typography>
                  {" ??? I'll be in your neighborhood doing errands this???"}

                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ pt: 1 }}
                  >
                    <Grid item xs={6}>
                      {'$123,000'}
                    </Grid>
                    <Grid item xs={6}>
                      {'Jan 9, 2014'}
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Grid>

      {/*PAGINATION */}
      <Grid item sm={12}>
        <Grid container sx={{ pt: 1 }} justifyContent="center">
          <Grid item>
            <Stack spacing={2}>
              <Pagination count={5} shape="rounded" />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
