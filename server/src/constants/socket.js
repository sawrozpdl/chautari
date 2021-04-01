export const events = {
  BYE: 'bye',
  HELLO: 'hello',
  UPDATE: 'update',
  CONNECT: 'connect',
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',

  ERROR: 'error',

  TYPING: 'typing',
  STOP_TYPING: 'stop typing',

  MESSAGE: 'message',
  SEND_MESSAGE: 'send message',
  PRIVATE_MESSAGE: 'private message',

  JOIN_ROOM: 'join room',
  ROOM_INFO: 'room info',
  LEAVE_ROOM: 'leave room',

  JOIN_RANDOM_CHAT: 'join random chat',
  LEAVE_RANDOM_CHAT: 'leave random chat',
  MATCHED: 'matched',
  UNMATCHED: 'unmatched',

  SERVER_INFO: 'server info',
};

export const userStatus = {
  IDLE: 'IDLE',
  IN_ROOM: 'IN_ROOM',
  IN_QUEUE: 'IN_QUEUE',
};

export const messageTypes = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  UNAUTHORIZED: 'UNAUTHORIZED',
};

export const publicSettingsAttrs = ['nickname', 'color', 'user', 'interests'];
export const publicUserAttrs = [
  'firstName',
  'lastName',
  'middleName',
  'id',
  'location',
  'ageGroup',
  'activeRoles',
];
