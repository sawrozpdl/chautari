import {
  userStatus,
  publicSettingsAttrs,
  publicUserAttrs,
} from '../../constants/socket';
import logger from '../../utils/logger';
import { withAttrs } from '../../utils/object';
import { cleanString } from '../../utils/string';
import { getRoom, removeUserFromRoom } from './room';
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

export const setUser = (id, settings) => {
  users[id] = settings;
};

export const isAdmin = (id) => {
  return getRoom(getUser(id, 'activeRoom'), 'admin') === id;
};

export const getPublicUserInfo = ({ userId, joinedAt }) => {
  const userSettings = users[userId];

  userSettings.id = userId;
  userSettings.joinedAt = joinedAt;

  if (!userSettings.privateMode) {
    userSettings.user = withAttrs(userSettings.user, publicUserAttrs);
  }

  return withAttrs(userSettings, publicSettingsAttrs);
};

const baseSettings = {
  status: userStatus.IDLE,
  activeRoom: null,
  reports: [],
  subscriptions: [],
};

export const registerUser = (id, settings, ip) => {
  users[id] = { ...settings, ...baseSettings, ip };

  stats.idle++;
};

export const updateUser = (id, curr, updateStats = true) => {
  const prev = users[id];
  users[id] = { ...prev, ...curr };

  if (updateStats) {
    _updateStats(prev, curr);
  }
};

export const reportUser = (id, from) => {
  const user = users[id];

  if (!user) {
    return -1;
  }

  if (user.reports.includes(from)) {
    return -2;
  }

  user.reports.push(from);

  return user.reports.length;
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
  let matches = 0;

  const user1Settings = users[user1];
  const user2Settings = users[user2];
  const { interests: user1Interests } = user1Settings;
  const { interests: user2Interests } = user2Settings;

  if (
    (!user1Settings.ageGroupMatching && user2Settings.ageGroupMatching) ||
    (user1Settings.ageGroupMatching && !user2Settings.ageGroupMatching) ||
    (user1Settings.ageGroupMatching &&
      user2Settings.ageGroupMatching &&
      user1Settings.user.ageGroup !== user2Settings.user.ageGroup)
  ) {
    return 0;
  }

  user1Interests.forEach((interest1) => {
    user2Interests.forEach((interest2) => {
      if (cleanString(interest1) === cleanString(interest2)) {
        matches++;
      }
    });
  });

  return matches === 0
    ? 0
    : matches / (user1Interests.length + user2Interests.length);
};

export const getStats = () => {
  return stats;
};
