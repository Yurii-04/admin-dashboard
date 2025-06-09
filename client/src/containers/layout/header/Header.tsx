import Container from '../../../components/container/Container.tsx';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { styles } from './header.styles.ts';

const Header = () => {
  return (
    <Container component='header'>
      <AppBar component='div' sx={styles.header}>
        <Toolbar>
          <Box
            sx={styles.nav}
            component='nav'
          >
            <Button variant='text'>LOGO</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;