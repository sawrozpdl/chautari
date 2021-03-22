import { chatGuides } from '../constants/labels';

const getRandomChatGuide = (excluding?: any): string => {
  const filteredGuides = excluding
    ? chatGuides.filter((guide) => !excluding.includes(guide))
    : chatGuides;

  return filteredGuides[Math.floor(Math.random() * filteredGuides.length)];
};

export { getRandomChatGuide };
