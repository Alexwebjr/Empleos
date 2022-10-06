import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavBar, SideBar } from '../../../components';
import { Filter } from '../components/Filter';
import { AdminSideBar } from '../../admin/components/AdminSideBar';

//const drawerWidth = 240;

export const JobLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />

      {/**SideBar / Filter */}
      <SideBar>
        <Filter />
      </SideBar>

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
