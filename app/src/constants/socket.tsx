export const MAX_RECONNECTION_ATTEMPTS = 10;
export const MAX_RECONNECTION_DELAY = 15000;

export const events = {
  BYE: 'bye',
  HELLO: 'hello',
  CONNECT: 'connect',
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',

  ERROR: 'error',
  UPDATE: 'update',

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
