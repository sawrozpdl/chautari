import http from 'http';
import socket from 'socket.io';

import { events } from './constants/socket';

export const attachSocket = (app, callback) => {
  const io = socket({
    serveClient: false,
  });

  const server = http.Server(app);

  io.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
  });

  io.on(events.CONNECTION, (socket) => {
    console.log('New user joined!', socket.id);

    socket.on(events.SEND_MESSAGE, (data) => {
      io.sockets.emit(events.MESSAGE, data);
    });
  });

  return server;
};
