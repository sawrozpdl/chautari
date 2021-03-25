import IO from '../../socket';

import { events, userStatus } from '../../constants/socket';
import { getRandomKey } from '../../utils/string';
import { getUser, updateUser } from '../models/user';
import {
  matchOrJoinQueue,
  leaveRandomChatForUser,
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

    IO.to(match)
      .to(userId)
      .emit(events.MATCHED, {
        room: generatedRoomName,
        key: generatedKey,
        partner: getUser(match, 'nickname'),
      });
  } else {
    updateUser(userId, { status: userStatus.IN_QUEUE });
  }
};

export const leaveRandomChat = (data, socket) => {
  const { id: userId } = socket;

  const roomName = getUser(userId, 'activeRoom');

  leaveRandomChatForUser(roomName, userId);
};
