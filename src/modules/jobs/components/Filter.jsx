import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSearchJobs } from '../store';
import { Box, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import { JobListItem } from './JobListItem';

export const Filter = () => {
  const [sort, setSort] = React.useState(false);
  const { jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  //Calling jobs
  React.useEffect(() => {
    dispatch(startSearchJobs());
  }, []);

  //Sorting by money/ Date / Id

  return (
    <>
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
            {jobs.map((job) => (
              <JobListItem key={job.id} job={job} />
            ))}
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
    </>
  );
};
