import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { styles } from './app-main.styles';

const AppMain = () => {
  return (
    <Box sx={styles.content} component='main'>
      <Suspense fallback={<h1>Loading</h1>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default AppMain;