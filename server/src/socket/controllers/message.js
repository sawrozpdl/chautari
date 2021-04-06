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

export const typing = (data, socket, { stopped = false }) => {
  const { id: userId } = socket;
  const user = getUser(userId);
  const activeRoom = user.activeRoom;

  socket.to(activeRoom).emit(stopped ? events.STOP_TYPING : events.TYPING, {
    id: userId,
    nickname: user.nickname,
  });
};
