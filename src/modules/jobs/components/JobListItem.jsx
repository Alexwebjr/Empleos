import * as React from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveJob } from '../store';
import { Grid } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export const JobListItem = ({ job }) => {
  const dispatch = useDispatch();

  const onClickJob = () => {
    dispatch(setActiveJob(job));
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
    <ListItem alignItems="flex-start" key={job.id} onClick={onClickJob}>
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
              justifyContent="space-between"
              sx={{ pt: 1 }}
            >
              <Grid item xs={6}>
                ${job.salary}
              </Grid>
              <Grid item xs={6}>
                {job.createdAt}
              </Grid>
            </Grid>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};
