export const events = {
  BYE: 'bye',
  HELLO: 'hello',
  ACK_LEAVE: 'ack leave',
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

  CREATE_ROOM: 'create room',
  ROOM_CREATED: 'room created',
  ROOM_CREATION_FAILED: 'room creation failed',

  REQUEST_JOIN: 'request join',
  JOIN_REQUEST_ACCEPTED: 'join request accepted',
  JOIN_REQUEST_REJECTED: 'join request rejected',

  JOIN_ROOM: 'join room',
  ROOM_INFO: 'room info',
  LEAVE_ROOM: 'leave room',

  JOIN_RANDOM_CHAT: 'join random chat',
  LEAVE_RANDOM_CHAT: 'leave random chat',
  MATCHED: 'matched',
  UNMATCHED: 'unmatched',

  KICKED: 'kicked',
  PROMOTED: 'promoted',
  REPORTED: 'reported',
  BANNED_FROM_ROOM: 'banned from room',
  BANNED_FROM_SERVER: 'banned from server',
  USER_ACTION: 'user action',
  USER_ACTION_RESULT: 'user action result',

  FETCH_PUBLIC_ROOM_LIST: 'fetch public room list',
  PUBLIC_ROOM_LIST: 'public room list',

  FETCH_SERVER_INFO: 'fetch server info',
  SERVER_INFO: 'server info',
};

export const userActions = {
  KICK_USER: 'kick user',
  BAN_USER: 'ban user',
  REPORT_USER: 'report user',
  PROMOTE_USER: 'promote user',
};

export const userActionResults = {
  SUCCESS: 'success',
  FAILED: 'failed',
  UNAUTHORIZED: 'unauthorized',
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

export const publicSettingsAttrs = [
  'id',
  'joinedAt',
  'nickname',
  'color',
  'user',
  'interests',
];
export const publicUserAttrs = [
  'firstName',
  'lastName',
  'middleName',
  'id',
  'location',
  'ageGroup',
  'activeRoles',
];
