import React from 'react';

const App = React.lazy(() => import('./App'));
const Setup = React.lazy(() => import('./Setup'));
const Verify = React.lazy(() => import('./Verify'));
const EditRoom = React.lazy(() => import('./EditRoom'));
const RoomList = React.lazy(() => import('./RoomList'));
const Settings = React.lazy(() => import('./Settings'));
const RoomChat = React.lazy(() => import('./Chat/RoomChat'));
const RandomChat = React.lazy(() => import('./Chat/RandomChat'));

export {
  App,
  Setup,
  Verify,
  Settings,
  RoomChat,
  EditRoom,
  RoomList,
  RandomChat,
};
