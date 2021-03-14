import { CssBaseline } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import BaseRouter from './BaseRouter';
import { fetchUser } from './services/user';
import { createTheme } from './theme/create';
import useSettings from './hooks/useSettings';
import UserContext from './context/UserContext';

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  const userCtx: any = useContext(UserContext);
  const { setUser } = userCtx;

  useEffect(() => {
    fetchUser(setUser);
    // eslint-disable-next-line
  }, []);

  const useStyles = makeStyles((theme: any) => ({
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
