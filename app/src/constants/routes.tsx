const routes = {
  HOME: '/',
  APP: '/app',
  SETUP: '/app/setup',
  VERIFY: '/app/verify',
  CHAT: '/app/chat',
  RANDOM_CHAT: '/app/chat/random',
  ROOM_CHAT: '/app/chat/room/:name',
  ROOM_OPTION: '/app/room/:option',
  ROOM_LIST: '/app/rooms',
  SETTINGS: '/app/settings',
  AUTH_CALLBACK: '/auth/callback',
  NOT_FOUND: '/404',
};

const roomOptions = {
  CREATE: 'create',
  JOIN: 'join',
};

export { routes as default, roomOptions };
