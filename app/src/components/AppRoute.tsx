import React from 'react';
import { Route } from 'react-router';

const AppRoute = (props: any): any => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props: any): any => <Component {...props} {...rest} />}
    />
  );
};

export default AppRoute;
