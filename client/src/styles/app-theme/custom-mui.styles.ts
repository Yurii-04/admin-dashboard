import { createTheme } from '@mui/material';
import { appTypography, button, menuItem, svgIcon, textField } from './index';
import palette from './app.pallete';
import tooltip from './app.tooltip';

export const theme = createTheme({
  typography: appTypography,
  palette,
  components: {
    MuiButton: button,
    MuiMenuItem: menuItem,
    MuiSvgIcon: svgIcon,
    MuiTextField: textField,
    MuiTooltip: tooltip,
  },
});
