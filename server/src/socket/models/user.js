import logger from '../../utils/logger';
import { removeUserFromRoom } from './room';
import { cleanString } from '../../utils/string';
import { userStatus } from '../../constants/socket';
import { getQueueForUser, leaveQueue } from './queue';

const users = {};

const stats = {
  inQueue: 0,
  idle: 0,
  inRoom: 0,
};

const STATE_MAP = {
  [userStatus.IDLE]: 'idle',
  [userStatus.IN_QUEUE]: 'inQueue',
  [userStatus.IN_ROOM]: 'inRoom',
};

const _updateStats = (prev, curr) => {
  if (prev.status !== curr.status) {
    stats[STATE_MAP[prev.status]]--;
    stats[STATE_MAP[curr.status]]++;
  }
};

export const getUser = (id, key) => {
  return key ? users[id][key] : users[id];
};

export const registerUser = (id, settings) => {
  settings.status = userStatus.IDLE;
  settings.activeRoom = null;
  settings.subscriptions = [];
  users[id] = settings;

  stats.idle++;
};

export const updateUser = (id, curr) => {
  const prev = users[id];
  users[id] = { ...prev, ...curr };

  _updateStats(prev, curr);
};

export const logoutUser = (userId, callback) => {
  const user = users[userId];
  if (!user) return;
  if (user.status === userStatus.IN_QUEUE) {
    leaveQueue(userId);
  } else if (user.status === userStatus.IN_ROOM) {
    removeUserFromRoom(user.activeRoom, userId);
  }

  if (callback) callback(user.status);
  stats[STATE_MAP[user.status]]--;

  delete users[userId];
};

export const getMatchPercentage = (user1, user2) => {
  const matches = 1;
  const user1Interests = users[user1].interests;
  const user2Interests = users[user2].interests;

  user1Interests.forEach((interest1) => {
    user2Interests.forEach((interest2) => {
      if (cleanString(interest1) === cleanString(interest2)) {
        matches++;
      }
    });
  });

  return (matches * 2) / (2 + user1Interests.length + user2Interests.length);
};

export const getStats = () => {
  return stats;
};