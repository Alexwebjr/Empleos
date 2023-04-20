import * as React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Cancel, Save } from '@mui/icons-material';

export const FormBox = ({ title, children }) => {
  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
        <Grid item sm={12} md={12}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Grid>

        {children}
      </Grid>
    </>
  );
};
