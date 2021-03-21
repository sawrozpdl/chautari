import React from 'react';

const App = React.lazy(() => import('./App'));
const Chat = React.lazy(() => import('./Chat'));
const Setup = React.lazy(() => import('./Setup'));
const Verify = React.lazy(() => import('./Verify'));
const EditRoom = React.lazy(() => import('./EditRoom'));
const RoomList = React.lazy(() => import('./RoomList'));
const Settings = React.lazy(() => import('./Settings'));

export { App, Settings, Setup, Verify, Chat, EditRoom, RoomList };
