import IO from '../../socket';
import { getUser } from '../models/user';
import { getStats } from '../models/room';
import { leaveRoomForUser } from '../services/roomChat';
import { events, userActions } from '../../constants/socket';

const handleUserBan = (toBan, socket) => {
  const { id: userId } = socket;

  const { roomName, ip } = getUser(toBan);
};

const handleUserKick = (toKick, socket) => {
  const { id: userId } = socket;

  const { nickname, activeRoom: roomName } = getUser(toKick);

  leaveRoomForUser(roomName, toKick, (roomDeleted = false) => {
    if (!roomDeleted) {
      IO.in(roomName).emit(events.MESSAGE, {
        data: `${nickname} has been kicked out of the room.`,
        user: 'Admin',
        isInfo: true,
        time: Date.now(),
      });

      IO.to(toKick).emit(events.KICKED, {
        roomName,
      });

      IO.in(roomName).emit(events.ROOM_INFO, getStats(roomName));
    }
  });
};

const handleUserReport = (toBan, socket) => {
  const { id: userId } = socket;
};

const handleUserPromote = (toBan, socket) => {
  const { id: userId } = socket;
};

const ackLeave = (data, socket) => {
  const { id: userId } = socket;

  const roomName = getUser(userId, 'activeRoom');

  socket.leave(roomName);
};

const handlerMap = {
  [userActions.BAN_USER]: handleUserBan,
  [userActions.KICK_USER]: handleUserKick,
  [userActions.REPORT_USER]: handleUserReport,
  [userActions.PROMOTE_USER]: handleUserPromote,
};

const userActionHandler = (data, socket) => {
  const { id: userId } = socket;

  const { action, user: forUser, ...props } = data;

  handlerMap[action](forUser, socket, props);
};

export { userActionHandler as userActions, ackLeave };
