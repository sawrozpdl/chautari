import PropType from 'prop-types';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import routes from '../constants/routes';
import { LoadingScreen } from '../components';
import { App, Settings, Setup } from '../views';

const Topbar = React.lazy(() => import('../components/topbar'));

const useStyles = makeStyles((theme: any) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  content: {
    height: '100%',
    backgroundColor: theme.palette.background.dark,
  },
}));

const AppRouter: React.FC<any> = (props: any) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Suspense fallback={<div />}>
        <Topbar {...props} />
      </Suspense>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path={routes.APP} component={App} />
          <Route exact path={routes.SETUP} component={Setup} />
          <Route exact path={routes.SETTINGS} component={Settings} />
        </Switch>
      </Suspense>
    </div>
  );
};

AppRouter.propTypes = {
  user: PropType.any,
};

export default AppRouter;
