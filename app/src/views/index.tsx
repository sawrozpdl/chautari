import React from 'react';

const App = React.lazy(() => import('./App'));
const Settings = React.lazy(() => import('./Settings'));

export { App, Settings };
