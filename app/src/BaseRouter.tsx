import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from './constants/routes';
import UserContext from './context/UserContext';

import Home from './views/Home';
import NotFound from './views/NotFound';
import AppRouter from './routers/AppRouter';

const BaseRouter: React.FC = () => {
  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;

  return (
    <Switch>
      <Route
        exact
        path={routes.HOME}
        render={(props) => <Home {...props} user={user} />}
      />
      <Route path={routes.APP} component={AppRouter} />
      <Route exact path={routes.NOT_FOUND} component={NotFound} />
      <Redirect to={routes.NOT_FOUND} />
    </Switch>
  );
};

export default BaseRouter;
