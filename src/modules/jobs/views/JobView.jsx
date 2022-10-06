import { Grid, Typography } from '@mui/material';
import Image from 'mui-image';

export const JobView = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        minHeight: 'calc(100vh - 110px)',
        padding: 0,
      }}
    >
      {/*IMAGEN */}
      <Grid item sm={12} minWidth="100%" padding={0}>
        <Image
          src="https://images.pexels.com/photos/140945/pexels-photo-140945.jpeg"
          height="20vh"
          width="100%"
          fit="cover"
          duration={300}
          easing="ease-in-out"
          alt="Job Image cover"
        />
      </Grid>

      {/*CONTENT */}
      <Grid item sm={12}></Grid>
    </Grid>
  );
};
