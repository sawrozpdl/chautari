import { getMatchPercentage, getUser } from './user';

const safeQueue = {
  commonInterest: {},
  anyone: {},
};
const unsafeQueue = {
  commonInterest: {},
  anyone: {},
};

export const joinQueue = (queue, userId) => {
  queue[userId] = true;
};

export const leaveQueue = (userId, queue = null) => {
  delete (queue || getQueueForUser(getUser(userId)))[userId];
};

export const getQueueForUser = ({ user, interestMatching }) =>
  (user.ageGroup !== null ? safeQueue : unsafeQueue)[
    interestMatching ? 'commonInterest' : 'anyone'
  ];
