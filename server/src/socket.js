import http from 'http';
import socket from 'socket.io';

import { events } from './constants/socket';
import { handleSocketConnection } from './socket/controllers/core';

const IO = socket({
  serveClient: false,
});

IO.on(events.CONNECTION, handleSocketConnection);

const attachSocket = (app, callback) => {
  const server = http.Server(app);

  IO.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  });

  return server;
};

export { IO as default, attachSocket };
