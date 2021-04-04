import IO from '../../socket';

import logger from '../../utils/logger';
import { handle } from '../../utils/socket';
import { events } from '../../constants/socket';

import { sendMessage } from './message';
import { getStats } from '../models/user';
import { connect, update, disconnect } from './stat';
import { joinRandomChat, leaveRandomChat } from './randomChat';
import { createRoom, requestJoin, joinRoom, leaveRoom } from './roomChat';

export const handleSocketConnection = (socket) => {
  logger.info('New user joined!', socket.id);

  socket.on(events.JOIN_RANDOM_CHAT, handle(joinRandomChat, socket));

  socket.on(events.LEAVE_RANDOM_CHAT, handle(leaveRandomChat, socket));

  socket.on(events.CREATE_ROOM, handle(createRoom, socket));

  socket.on(events.REQUEST_JOIN, handle(requestJoin, socket));

  socket.on(events.JOIN_ROOM, handle(joinRoom, socket));

  socket.on(events.LEAVE_ROOM, handle(leaveRoom, socket));

  socket.on(events.SEND_MESSAGE, handle(sendMessage, socket));

  socket.on(events.HELLO, handle(connect, socket));

  socket.on(events.UPDATE, handle(update, socket));

  socket.on(events.BYE, handle(disconnect, socket, { consented: true }));

  socket.on(events.DISCONNECT, handle(disconnect, socket));
};
