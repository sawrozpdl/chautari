import logger from '../../utils/logger';
import { notify } from '../services/notify';
import { updateUser, getUser } from '../models/user';
import { leaveRoomForUser } from '../services/roomChat';
import { deleteRoom, getRoom, getStats } from '../models/room';
import { events, messageTypes, userStatus } from '../../constants/socket';

export const joinRoom = (data, socket) => {
  const { id: userId } = socket;
  const { room: roomName, key: enteringKey } = data;

  const room = getRoom(roomName);

  if (!roomName) {
    return notify(userId, {
      type: messageTypes.ERROR,
      text: 'You wanna join void? *loads gun*',
      requestId: data?.requestId,
    });
  }

  if (!room) {
    return notify(userId, {
      type: messageTypes.ERROR,
      text: "Aye, that room doesn't exist lol",
      requestId: data?.requestId,
    });
  }

  if (room.key && room.key !== enteringKey) {
    return notify(userId, {
      type: messageTypes.ERROR,
      text: "That key ain't right, I am calling 911",
      requestId: data?.requestId,
    });
  }

  if (room.users.includes(userId)) {
    return notify(userId, {
      type: messageTypes.ERROR,
      text: 'You are already in this room!',
      requestId: data?.requestId,
    });
  }

  if (room.users.length >= room.maxUsers) {
    return notify(userId, {
      type: messageTypes.ERROR,
      text: 'Too late bro, this room is full!',
      requestId: data?.requestId,
    });
  }

  room.users.push(userId);
  updateUser(userId, { activeRoom: roomName, status: userStatus.IN_ROOM });
  socket.join(roomName);

  socket.to(roomName).emit(events.ROOM_INFO, getStats(roomName));
};

export const leaveRoom = (data, socket) => {
  const { id: userId } = socket;
  const roomName = getUser(userId, 'activeRoom');

  leaveRoomForUser(roomName, userId, () => {
    socket.to(roomName).emit(events.MESSAGE, {
      data: `${getUser(userId, 'nickname')} has left the room.`,
      user: 'Admin',
      isInfo: true,
    });

    socket.to(roomName).emit(events.ROOM_INFO, getStats(roomName));
  });
};
