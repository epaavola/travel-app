import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { RecoilRoot } from 'recoil'

/**
 * Index file of the frontend application which renders App.js, provides theme and CssBasline.
 * Application uses react and material UI.
 * Recoil is used for state management
 * Backend connection (REST API) is build with Axios.
 * 
 * Pages folder contains file for each page: Homepage, Admin page and login page.
 * Components are in separated under components folder. 
 * Each page contains multiple components.
 * 
 * Page layout is made with Grid and flexbox.
 */


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <RecoilRoot>
          <App />
        </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
