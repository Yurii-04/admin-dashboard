import Box from '@mui/material/Box';
import Header from '../layout/header/Header.tsx';
import { styles } from './app-content.styles.ts';
import AppMain from '../layout/app-main/AppMain.tsx';

const AppContent = () => {
  return (
    <Box sx={styles.root}>
      <Header />
      <AppMain />
    </Box>
  );
};

export default AppContent;