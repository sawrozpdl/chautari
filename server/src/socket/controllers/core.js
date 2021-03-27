import IO from '../../socket';

import logger from '../../utils/logger';
import { handle } from '../../utils/socket';
import { events } from '../../constants/socket';

import { sendMessage } from './message';
import { getStats } from '../models/user';
import { connect, disconnect } from './stat';
import { joinRoom, leaveRoom } from './roomChat';
import { joinRandomChat, leaveRandomChat } from './randomChat';

export const handleSocketConnection = (socket) => {
  logger.info('New user joined!', socket.id);

  socket.on(events.JOIN_RANDOM_CHAT, handle(joinRandomChat, socket));

  socket.on(events.LEAVE_RANDOM_CHAT, handle(leaveRandomChat, socket));

  socket.on(events.JOIN_ROOM, handle(joinRoom, socket));

  socket.on(events.LEAVE_ROOM, handle(leaveRoom, socket));

  socket.on(events.SEND_MESSAGE, handle(sendMessage, socket));

  socket.on(events.HELLO, handle(connect, socket));

  socket.on(events.BYE, handle(disconnect, socket, { consented: true }));

  socket.on(events.DISCONNECT, handle(disconnect, socket));
};
