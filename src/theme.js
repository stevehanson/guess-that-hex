import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff6246',
      contrastText: '#fff'
    },
    secondary: {
      main: '#40c9aa',
      contrastText: '#fff'
    },
  },
  typography: {
    fontSize: 16
  },
});

export default theme
