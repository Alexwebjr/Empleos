import { Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { NavBar, SideBar } from '../../../components';
import { Filter } from '../components/Filter';

//const drawerWidth = 240;

export const JobLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />

      {/**SideBar / Filter */}
      <SideBar>
        <Filter />
      </SideBar>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
