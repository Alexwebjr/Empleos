import { Box, Toolbar } from '@mui/material';
import { Loading, NavBar, SideBar } from '../../../components';
import { AdminSideBar } from '../components/AdminSideBar';

export const AdminLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Loading />
      <NavBar />

      {/**SideBar / Filter */}
      <SideBar>
        <AdminSideBar />
      </SideBar>

      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
