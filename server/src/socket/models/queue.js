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

export const leaveQueue = (queue, userId) => {
  delete queue[userId];
};

export const getQueueForUser = ({ user, interestMatching }) =>
  (user.ageGroup !== null ? safeQueue : unsafeQueue)[
    interestMatching ? 'commonInterest' : 'anyone'
  ];
