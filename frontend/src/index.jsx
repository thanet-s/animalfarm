import { render } from 'react-dom';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import './index.css';
// import {Fragment} from 'react';
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: {
      main: '#039be5',
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      'Prompt',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
