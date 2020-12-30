import { createMuiTheme } from '@material-ui/core/styles';
import { red, lightBlue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({  
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1770, //1280      
      xl: 1920,
      
    },
  },
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
      default: '#8e7ba1',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          
        },
      },
    },
    MuiTabScrollButton: {
      root: {
        color: '#F0EFF3'
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