import IO from '../../socket';

import logger from '../../utils/logger';
import { handle } from '../../utils/socket';
import { events } from '../../constants/socket';

import { getStats } from '../models/user';
import { sendMessage, typing } from './message';
import { connect, update, disconnect } from './stat';
import { fetchPublicRooms, fetchServerInfo } from './fetch';
import { joinRandomChat, leaveRandomChat } from './randomChat';
import { createRoom, requestJoin, joinRoom, leaveRoom } from './roomChat';

export const handleSocketConnection = (socket) => {
  logger.info('New user joined!', socket.id);

  // Basic connection events:

  socket.on(events.HELLO, handle(connect, socket));

  socket.on(events.UPDATE, handle(update, socket));

  socket.on(events.BYE, handle(disconnect, socket, { consented: true }));

  socket.on(events.DISCONNECT, handle(disconnect, socket));

  // Join/Leave events:

  socket.on(events.JOIN_RANDOM_CHAT, handle(joinRandomChat, socket));

  socket.on(events.LEAVE_RANDOM_CHAT, handle(leaveRandomChat, socket));

  socket.on(events.CREATE_ROOM, handle(createRoom, socket));

  socket.on(events.REQUEST_JOIN, handle(requestJoin, socket));

  socket.on(events.JOIN_ROOM, handle(joinRoom, socket));

  socket.on(events.LEAVE_ROOM, handle(leaveRoom, socket));

  // Message events:

  socket.on(events.SEND_MESSAGE, handle(sendMessage, socket));

  socket.on(events.TYPING, handle(typing, socket));

  socket.on(events.STOP_TYPING, handle(typing, socket, { stopped: true }));

  // Fetch events

  socket.on(events.FETCH_SERVER_INFO, handle(fetchServerInfo, socket));

  socket.on(events.FETCH_PUBLIC_ROOM_LIST, handle(fetchPublicRooms, socket));
};
