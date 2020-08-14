import { createMuiTheme } from '@material-ui/core/styles';
import { red, blueGrey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({  
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  overrides: {
    MuiTabScrollButton: {
      root: {
        color: 'black'
      }
    }
  }
});

export default theme;