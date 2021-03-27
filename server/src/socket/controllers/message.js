import { getUser } from '../models/user';
import { notify } from '../services/notify';
import { events, messageTypes } from '../../constants/socket';

export const sendMessage = (data, socket) => {
  const { id: userId } = socket;
  const activeRoom = getUser(userId, 'activeRoom');

  if (!activeRoom) {
    return notify(userId, {
      type: messageTypes.ERROR,
      text: "You aren't in a room,talking to ghosts now are we?",
      requestId: data?.requestId,
    });
  }

  socket.to(activeRoom).emit(events.MESSAGE, data);
};
