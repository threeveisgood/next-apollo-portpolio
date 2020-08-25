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
    MuiCssBaseline: {
      '@global': {
        html: {
          backgroundColor: 'ghostwhite'
        },
      },
    },
    MuiTabScrollButton: {
      root: {
        color: 'black'
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none'
      },
      wrapper: {
        paddingBottom: '15px',        
      },
      textColorPrimary: {
        color: '#37474f'
      },
      textColorInherit: {
        color: 'revert'
      }
    },      
  }
});

export default theme;