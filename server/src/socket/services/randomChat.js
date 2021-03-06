import IO from '../../socket';

import { deleteRoom, getRoom } from '../models/room';
import { events, userStatus } from '../../constants/socket';
import { getMatchPercentage, getUser, updateUser } from '../models/user';
import { getQueueForUser, joinQueue, leaveQueue } from '../models/queue';

const _findBestMatch = (id, queue) => {
  const bestMatch = { user: null, score: 0 };
  Object.keys(queue).forEach((userId) => {
    const newScore = getMatchPercentage(id, userId);
    if (newScore && newScore > bestMatch.score) {
      bestMatch.user = userId;
      bestMatch.score = newScore;
    }
  });

  if (bestMatch.user) {
    leaveQueue(bestMatch.user, queue);
    return bestMatch.user;
  } else {
    joinQueue(queue, id);
  }
};

const _findRandomMatch = (id, queue) => {
  const waitingUsers = Object.keys(queue);

  if (waitingUsers.length !== 0) {
    const match = waitingUsers[0];
    leaveQueue(match, queue);
    return match;
  } else {
    joinQueue(queue, id);
  }
};

export const matchOrJoinQueue = (id) => {
  const userSettings = getUser(id);

  const queue = getQueueForUser(userSettings);

  if (userSettings.interestMatching && userSettings.interests?.length !== 0) {
    return _findBestMatch(id, queue);
  } else {
    return _findRandomMatch(id, queue);
  }
};

export const leaveRandomChatForUser = (roomName, userId) => {
  const room = getRoom(roomName);
  if (!room) return;

  const otherUserObj = room.users.find((userObj) => userId !== userObj.userId);

  deleteRoom(roomName);

  if (otherUserObj) {
    IO.to(otherUserObj.userId).emit(events.UNMATCHED, 'OOF');

    updateUser(otherUserObj.userId, {
      activeRoom: null,
      status: userStatus.IDLE,
    });
  }

  updateUser(userId, {
    activeRoom: null,
    status: userStatus.IDLE,
  });
};

export const leaveQueueForUser = (userId) => {
  leaveQueue(userId);

  updateUser(userId, {
    status: userStatus.IDLE,
  });
};
