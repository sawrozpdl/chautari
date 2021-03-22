import { cleanString } from '../../utils/string';
import { userStatus } from '../../constants/socket';

export const users = {};

export const safeQueue = {
  commonInterest: {},
  anyone: {},
};
export const unsafeQueue = {
  commonInterest: {},
  anyone: {},
};

export const registerUser = (id, settings) => {
  settings.status = userStatus.IDLE;
  users[id] = settings;
};

export const logoutUser = (id) => {
  delete users[id];
};

export const joinQueue = (id) => {
  queue[id] = true;
};

export const leaveQueue = (id) => {
  delete queue[id];
};

export const getStats = () => {
  return {
    totalUsers: Object.keys(users).length,
  };
};

const _getMatchPercentage = (user1, user2) => {
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

  return (matches * 2) / (user1Interests.length + user2Interests.length);
};

const _findBestMatch = (id, queue) => {
  const bestMatch = { user: null, score: 0 };
  Object.keys(queue).forEach((userId) => {
    const newScore = _getMatchPercentage(id, userId);
    if (newScore > bestMatch.score) {
      bestMatch.user = userId;
      bestMatch.score = newScore;
    }
  });

  if (bestMatch.user) {
    leaveQueue(bestMatch.user);
    return bestMatch.user;
  } else {
    joinQueue(id);
  }
};

const _findRandomMatch = (id, queue) => {
  const waitingUsers = Object.keys(queue);

  if (waitingUsers.length !== 0) {
    const match = waitingUsers[0];
    leaveQueue(match);
    return match;
  } else {
    joinQueue(id);
  }
};

export const matchOrJoinQueue = (id) => {
  const userSettings = users[id];

  const isVerified = userSettings.user.ageGroup !== null;
  const { interestMatching } = userSettings;

  const queue = (isVerified ? safeQueue : unsafeQueue)[
    interestMatching ? 'commonInterest' : 'anyone'
  ];

  if (interestMatching) {
    return _findBestMatch(id, queue);
  } else {
    return _findRandomMatch(id, queue);
  }
};
