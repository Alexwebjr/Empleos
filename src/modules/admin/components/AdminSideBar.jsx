import * as React from 'react';
import { Box, List, Toolbar, Divider } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {
  BugReport,
  Code,
  ContactPhone,
  Group,
  Help,
  Work,
} from '@mui/icons-material';

export const AdminSideBar = () => {
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItem key="Jobs" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Users" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Adds" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Code />
            </ListItemIcon>
            <ListItemText primary="Adds" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key="Ayuda" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Ayuda" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Soporte" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <BugReport />
            </ListItemIcon>
            <ListItemText primary="Soporte" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Soporte" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ContactPhone />
            </ListItemIcon>
            <ListItemText primary="Soporte" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
