import { chatGuides } from '../constants/labels';
import { cleanString } from './string';

const getRandomChatGuide = (excluding?: any): string => {
  const filteredGuides = excluding
    ? chatGuides.filter((guide) => !excluding.includes(guide))
    : chatGuides;

  return filteredGuides[Math.floor(Math.random() * filteredGuides.length)];
};

const getCommonInterests = (
  user1Interests: Array<string>,
  user2Interests: Array<string>
): Array<string> => {
  const common: Array<string> = [];
  user1Interests.forEach((interest1) => {
    user2Interests.forEach((interest2) => {
      if (cleanString(interest1) === cleanString(interest2)) {
        common.push(interest1);
      }
    });
  });

  return common;
};

export { getCommonInterests, getRandomChatGuide };
