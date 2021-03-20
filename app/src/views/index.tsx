import React from 'react';

const App = React.lazy(() => import('./App'));
const Setup = React.lazy(() => import('./Setup'));
const Settings = React.lazy(() => import('./Settings'));

export { App, Settings, Setup };
