import { Grid, Typography } from '@mui/material';

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: 'calc(100vh - 110px)',
        padding: 4,
      }}
    >
      <Typography>Selecciona una vacante</Typography>
    </Grid>
  );
};
