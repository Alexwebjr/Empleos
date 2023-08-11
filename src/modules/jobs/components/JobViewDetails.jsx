import * as React from 'react';
import { useMemo } from 'react';
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
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Dns, People, PermMedia, Public } from '@mui/icons-material';

export const JobViewDetails = ({ job }) => {
  /*REQUISITOS */
  const requirement = useMemo(() => {
    return job.requirement.split(',');
  }, [job.requirement]);

  return (
    <>
      <Grid container direction="column" alignItems="start">
        {/*IMAGEN */}
        <Grid item sm={12} minWidth="100%" padding={0}>
          <Image
            src={
              job.image ||
              'https://images.pexels.com/photos/140945/pexels-photo-140945.jpeg'
            }
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
            {job.title}
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
                {job.summary}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {job.description}
              </Typography>

              {/*ADS 2 */}
              <Grid item sm={12} minWidth="100%" padding={1}>
                <Image
                  src="https://palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                  height="15vh"
                  width="90%"
                  fit="cover"
                  duration={300}
                  easing="ease-in-out"
                  alt="Job Image cover"
                />
              </Grid>
              {/*SIGN */}
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/43" />
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
              {/*ADS 2 */}
              <Image
                src="https://palmares.lemondeduchiffre.fr/images/joomlart/demo/default.jpg"
                height="15vh"
                width="275px"
                fit="cover"
                alt="Job Image cover"
              />
              {/*REQUERIMENT */}
              <Box sx={{ maxWidth: 275, margin: 'auto' }}>
                <Card variant="outlined">
                  <React.Fragment>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Requisitos
                      </Typography>

                      {/*LIST */}
                      {requirement.map((item, i) => (
                        <ListItemButton
                          key={i}
                          sx={{
                            py: 0,
                            minHeight: 32,
                            color: 'primary',
                          }}
                        >
                          <ListItemIcon sx={{ color: 'inherit' }}>
                            <Public />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
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
    </>
  );
};
