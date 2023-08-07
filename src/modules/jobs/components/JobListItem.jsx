import * as React from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { onActiveJob } from '../store';
import { Grid } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export const JobListItem = ({ job }) => {
  const dispatch = useDispatch();

  const onClickJob = () => {
    dispatch(onActiveJob(job));
  };

  const editedTitle = useMemo(() => {
    return job.title.length > 15
      ? job.title.substring(0, 15) + '...'
      : job.title;
  }, [job.title]);

  const editedSummary = useMemo(() => {
    return job.summary.length > 20
      ? job.summary.substring(0, 20) + '...'
      : job.summary;
  }, [job.summary]);

  return (
    <>
      <ListItem alignItems="flex-start" key={job.id} onClick={onClickJob}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://res.cloudinary.com/dczjxgeyn/image/upload/v1691424253/empleos/uohymwmrzmgnr0orydyl.png"
          />
        </ListItemAvatar>
        <ListItemText
          primary={editedTitle}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {editedSummary}
              </Typography>

              <Grid
                container
                spacing={2}
                component="span"
                justifyContent="space-between"
                sx={{ pt: 1 }}
              >
                <Grid item xs={6} component="span">
                  ${job.salary}
                </Grid>
                <Grid item xs={6} component="span">
                  {job.createdAt}
                </Grid>
              </Grid>
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  );
};
