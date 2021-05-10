import { userActionResults, userActions } from './socket';

const form = {
  gameBegin: 'Let the game begin!',
  cuteName: "We have chosen a cute name for you if you're lazy to type ;)",
  generatedAvatar: 'Your avatar image will be generated with this name',
  inappropriateName: "Oops, Looks like you can't use this name",
  shortName: 'Invalid characters or too short name',
  longName: 'Too long name, wanna use abbreviations?',
  badKey: 'Pass key is either too short or long',
};

const generic = {
  tooShort: 'Too short!',
  tooLong: 'Too long!',
};

const chat = {
  tooShort: 'Come on bruh, build up some speech lol',
  tooLong: 'Aye man, too long, take it easy',
};

const interests = {
  tooShort: 'Too short!, Have to be 3-50 characters.',
  tooLong: 'Too long!, Have to be 3-50 characters.',
};

const greetings = ["We're happy to see you here!", "Heyaaa, What's poppin?"];

const chatGuides = [
  'Share a cute cat fact!',
  'How is the weather today?',
  'Mention your biggest fear',
  'Who is your role model?',
  'Breathe in, Breathe out',
  'Grown-ups are weird species right?',
  'Vegetables have feelings – stop carrot cruelty',
  'Chocolate never asks stupid questions.',
  'You are not weird; you are just a limited edition.',
  'Be happy, it drives people crazy!',
  'What is it with men and remote control buttons?',
  'Clowns are scary and this is why.',
  'You should never start your diet on a Monday.',
  'Auto correct could ruin your life.',
  'Growing old is mandatory but growing up is completely optional.',
  '“Too busy” is just a myth.',
  'LOL is usually what people reply with when they have nothing else to say.',
];

const display = {
  SEVERAL_PEOPLE_TYPING: 'Several people are typing...',
};

const userActionResponses = {
  [userActionResults.SUCCESS]: {
    code: 'success',
    default: 'The action was performed successfully!',
    [userActions.BAN_USER]: 'User banned from this room!',
    [userActions.KICK_USER]: 'User kicked from this room!',
    [userActions.PROMOTE_USER]: 'User promoted to admin of this room!',
    [userActions.REPORT_USER]:
      'User has been reported of inappropriate behavior!',
  },
  [userActionResults.FAILED]: {
    code: 'error',
    default: 'Failed to perform this action!',
    [userActions.BAN_USER]: 'Failed to ban this user!',
    [userActions.KICK_USER]: 'Failed to kick this user!',
    [userActions.PROMOTE_USER]: 'Failed to promote this user!',
    [userActions.REPORT_USER]: 'Failed to report this user!',
  },
  [userActionResults.UNAUTHORIZED]: {
    code: 'warning',
    default: "You aren't authorized to perform this action!",
  },
};

export {
  form,
  generic,
  display,
  userActionResponses,
  greetings,
  interests,
  chat,
  chatGuides,
};
