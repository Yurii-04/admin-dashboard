import { Button, Checkbox, ThemeProvider } from '@mui/material';
import { theme } from './styles/app-theme/';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant='contained'>Test</Button>
      <Checkbox />
    </ThemeProvider>
  )
}

export default App
