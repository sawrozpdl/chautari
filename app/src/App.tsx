import React, { useEffect, useContext } from 'react';

import { createBrowserHistory } from 'history';
import { CssBaseline } from '@material-ui/core';
import { Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import BaseRouter from './BaseRouter';
import { createTheme } from './theme/create';
import useSettings from './hooks/useSettings';
import UserContext from './context/UserContext';
import { fetchUser, syncSettings } from './services/user';

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  const userCtx: any = useContext(UserContext);
  const { updateSettings } = useSettings();
  const { setUser } = userCtx;

  useEffect(() => {
    fetchUser(setUser, () => {
      updateSettings(syncSettings);
    });
  }, []);

  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
      '*::-webkit-scrollbar': {
        width: '0.4em',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey',
      },
    },
  }));

  const classes = useStyles();

  const { settings } = useSettings();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme(settings)}>
        <Router history={browserHistory}>
          <CssBaseline />
          <Switch>
            <BaseRouter />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
