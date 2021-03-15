import { render } from 'react-dom';
import App from './App';
import {
  HashRouter as Router,
} from 'react-router-dom';
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
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
