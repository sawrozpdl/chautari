import IO from '../../socket';
import { events } from '../../constants/socket';

export const handleSocketConnection = (socket) => {
  console.log('New user joined!', socket.id);

  socket.on(events.SEND_MESSAGE, (data) => {
    IO.sockets.emit(events.MESSAGE, data);
  });

  socket.on(events.HELLO, (data) => {
    // Register data
  });
};
