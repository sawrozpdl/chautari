import http from 'http';
import socket from 'socket.io';

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

  io.on('connection', (socket) => {
    console.log('New user joined!');

    socket.on('sendMessage', (data) => {
      io.sockets.emit('message', data);
    });
  });

  return server;
};
