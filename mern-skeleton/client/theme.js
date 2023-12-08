import { createMuiTheme } from '@material-ui/core/styles';
import { teal, deepOrange, yellow, brown } from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#FFC857', // Light green
      main: teal[500],  // Teal
      dark: '#1b5e20', // Dark green
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7043', // Light orange
      main: deepOrange[200], // Deep orange
      dark: '#e64a19', // Dark orange
      contrastText: '#000',
    },
    openTitle: '#3f4771',
    protectedTitle: yellow['100'], // Yellow
    type: 'light',
  },  
  background: {
    default: 'url("logo.jpg")', // No leading /
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
},

});

export default theme;
