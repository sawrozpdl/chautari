import logger from '../../utils/logger';
import { notify } from '../services/notify';
import { isBanned } from '../models/server';
import { getRoom, getStats } from '../models/room';
import { leaveRoomForUser } from '../services/roomChat';
import { events, userStatus } from '../../constants/socket';
import { getStats as getRoomStats } from '../models/room';
import { getStats as getUserStats } from '../models/user';
import { leaveRandomChatForUser } from '../services/randomChat';
import { getUser, logoutUser, registerUser, updateUser } from '../models/user';

export const connect = (data, socket) => {
  const { id: userId, request } = socket;
  const { remoteAddress: ip } = request.connection;

  registerUser(userId, data, ip);
};

export const update = (data, socket) => {
  const { id: userId } = socket;
  updateUser(userId, data, false);
};

const _leaveInvolvedRoom = (socket, userId, consented) => {
  const { nickname, activeRoom } = getUser(userId);
  const room = getRoom(activeRoom);

  if (room.isRandom) {
    leaveRandomChatForUser(activeRoom, userId);
  } else {
    leaveRoomForUser(activeRoom, userId, () => {
      socket.to(activeRoom).emit(events.MESSAGE, {
        data: `${nickname} has ${
          consented ? 'left the chat.' : 'been disconnected from the server.'
        }`,
        user: 'Admin',
        isInfo: true,
        time: Date.now(),
      });

      socket.to(activeRoom).emit(events.ROOM_INFO, getStats(activeRoom));
    });
  }
};

export const disconnect = (_, socket, { consented }) => {
  const { id: userId } = socket;

  logger.info('User disconnected!', userId);

  logoutUser(userId, (status) => {
    if (status === userStatus.IN_ROOM) {
      _leaveInvolvedRoom(socket, userId, consented);
    }
  });
};

export const getServerStats = () => {
  return {
    rooms: getRoomStats(),
    users: getUserStats(),
  };
};
