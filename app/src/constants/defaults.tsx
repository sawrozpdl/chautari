import { ANON, GUEST } from './app';
import { SELF_REF } from './ageGroup';
import THEMES from '../constants/themes';
import { getRandomColor } from '../utils/string';

export const defaultSettings = {
  nickname: GUEST,

  color: getRandomColor(),

  firstName: ANON,

  theme: THEMES.DARK,

  matchTimeout: 120, // In seconds

  privateMode: false, // Hide private info from people.

  interests: [], // Common likings for getting similar mindset matches.

  interestMatching: false, // Match based on interests or not

  preferredAgeGroup: SELF_REF, // SELF_REF is same age group as self.

  ageGroupMatching: false,

  locationMatching: false,

  safeMode: false, // Censor profanity and offensive languages.

  conversationSharing: true, // Contribute to Machine Learning by letting use self's conversations.

  timestamp: 0, // Time of saved settings.
};
