import { ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme/';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  )
}

export default App
