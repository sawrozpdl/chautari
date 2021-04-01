import IO from '../../socket';

import { getRandomKey } from '../../utils/string';
import { getUser, updateUser } from '../models/user';
import { events, userStatus } from '../../constants/socket';
import {
  matchOrJoinQueue,
  leaveRandomChatForUser,
  leaveQueueForUser,
} from '../services/randomChat';
import { createRoom, deleteRoom, getRoom } from '../models/room';

export const joinRandomChat = (data, socket) => {
  const { id: userId } = socket;
  const match = matchOrJoinQueue(userId);
  if (match) {
    const generatedRoomName = `${userId}_${match}`;
    const generatedKey = getRandomKey();

    createRoom(generatedRoomName, {
      users: [],
      maxUsers: 2,
      isRandom: true,
      key: generatedKey,
    });

    IO.to(match).to(userId).emit(events.MATCHED, {
      room: generatedRoomName,
      key: generatedKey,
    });
  } else {
    updateUser(userId, { status: userStatus.IN_QUEUE });
  }
};

export const leaveRandomChat = (data, socket) => {
  const { id: userId } = socket;

  const roomName = getUser(userId, 'activeRoom');

  if (roomName) {
    leaveRandomChatForUser(roomName, userId);
    socket.leave(roomName);
  } else {
    leaveQueueForUser(userId);
  }
};
