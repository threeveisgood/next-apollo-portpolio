import { createMuiTheme } from '@material-ui/core/styles';
import { red, lightBlue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({  
  palette: {
    primary: {
      main: lightBlue[800],
    },
    secondary: {
      main: '#3299d1',
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
          backgroundColor: '#F0EFF3'
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
        paddingBottom: '8px',     
        color: '#F0EFF3'   
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