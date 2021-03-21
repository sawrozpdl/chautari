import PropType from 'prop-types';
import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

import CoreRouter from './CoreRouter';
import routes from '../constants/routes';
import { Verify, Setup } from '../views';
import { LoadingScreen } from '../components';

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
          <Route exact path={routes.SETUP} component={Setup} />
          <Route exact path={routes.VERIFY} component={Verify} />
          <Route path={routes.APP} component={CoreRouter} />
        </Switch>
      </Suspense>
    </div>
  );
};

AppRouter.propTypes = {
  user: PropType.any,
};

export default AppRouter;
