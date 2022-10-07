import * as React from 'react';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'mui-image';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Dns, People, PermMedia, Public } from '@mui/icons-material';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export const JobView = () => {
  {
    /*REQUISITOS */
  }
  const data = [
    { icon: <People />, label: 'Authentication' },
    { icon: <Dns />, label: 'Database' },
    { icon: <PermMedia />, label: 'Storage' },
    { icon: <Public />, label: 'Hosting' },
  ];

  return (
    <Grid container direction="column" alignItems="start">
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

      {/*HEADING */}
      <Grid item sm={12} paddingLeft={3} paddingTop={3}>
        <Typography variant="h2" gutterBottom>
          Empresa X. Busca "Vacante"
        </Typography>
      </Grid>
      {/*CONTENT */}

      <Grid item sm={12} minWidth="100%" padding={3}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item sm={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam. Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Quos blanditiis
              tenetur unde suscipit, quam beatae rerum inventore consectetur,
              neque doloribus, cupiditate numquam dignissimos laborum fugiat
              deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
              blanditiis tenetur unde suscipit, quam beatae rerum inventore
              consectetur, neque doloribus, cupiditate numquam dignissimos
              laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>

            {/*SIGN */}
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Ana Thompson"
                  secondary="Reclutadora | Google"
                />
              </ListItem>
            </List>

            {/*APPLY */}
            <Button variant="contained" endIcon={<TrendingFlatIcon />}>
              Aplicar
            </Button>
          </Grid>

          <Grid item sm={12} md={4} textAlign="center">
            {/*REQUERIMENT */}
            <Box sx={{ maxWidth: 275, margin: 'auto' }}>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Requisitos
                    </Typography>

                    {/*LIST */}
                    {data.map((item) => (
                      <ListItemButton
                        key={item.label}
                        sx={{
                          py: 0,
                          minHeight: 32,
                          color: 'primary',
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 'medium',
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </CardContent>
                </React.Fragment>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
