import * as React from 'react';
import { Box, List, Toolbar, Divider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  BugReport,
  Code,
  ContactPhone,
  Group,
  Help,
  Work,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export const AdminSideBar = () => {
  return (
    <>
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <Link to="/admin/jobs">
            <ListItem key="Jobs" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Jobs" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/admin/users">
            <ListItem key="Users" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/admin/adds">
            <ListItem key="Adds" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText primary="Adds" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to="/admin/ayuda">
            <ListItem key="Ayuda" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Help />
                </ListItemIcon>
                <ListItemText primary="Ayuda" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/admin/soporte">
            <ListItem key="Soporte" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <BugReport />
                </ListItemIcon>
                <ListItemText primary="Soporte" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </>
  );
};
