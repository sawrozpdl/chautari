import IO from '../../socket';
import { banIP } from '../models/server';
import { notify } from '../services/notify';
import { MAX_USER_REPORTS } from '../../constants/app';
import { leaveRoomForUser } from '../services/roomChat';
import { events, userActions } from '../../constants/socket';
import { getUser, isAdmin, reportUser } from '../models/user';
import { leaveRandomChatForUser } from '../services/randomChat';
import { banIPInRoom, getRoom, getStats, patchRoom } from '../models/room';

const handleUserBan = (toBan, socket, { serverBan = false }) => {
  const { id: userId } = socket;

  const { nickname, activeRoom: roomName, ip } = getUser(toBan);

  if (serverBan) {
    banIP(ip);
  } else {
    banIPInRoom(roomName, ip);
  }

  leaveRoomForUser(roomName, toBan, (roomDeleted = false) => {
    if (!roomDeleted) {
      IO.in(roomName).emit(events.MESSAGE, {
        data: `${nickname} has been banned from this room.`,
        user: 'Admin',
        isInfo: true,
        time: Date.now(),
      });

      IO.to(toBan).emit(events.BANNED_FROM_ROOM, {
        roomName,
      });

      IO.in(roomName).emit(events.ROOM_INFO, getStats(roomName));
    }
  });
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

const handleUserReport = (toReport, socket) => {
  const { id: userId } = socket;

  const reportCount = reportUser(toReport, userId);

  if (reportCount < 0) {
    notify(userId, {
      type: 'error',
      message:
        reportCount === -2
          ? 'This user has already been reported!'
          : "This user doesn't exist in this server!",
    });

    return;
  } else if (reportCount >= MAX_USER_REPORTS) {
    handleUserBan(toReport, socket, { serverBan: true });
  }

  IO.to(userId).emit(events.REPORTED, {
    userId,
  });
};

const handleUserPromote = (toPromote, socket) => {
  const { id: userId } = socket;

  const { nickname, activeRoom: roomName } = getUser(toPromote);

  const patched = patchRoom(roomName, 'admin', toPromote);

  if (!patched) {
    notify(userId, {
      type: 'warning',
      message: 'Failed to promote the user!',
    });
    return;
  }

  IO.to(toPromote).emit(events.PROMOTED, {
    roomName,
  });

  IO.in(roomName).emit(events.MESSAGE, {
    data: `${nickname} has been made the new room admin.`,
    user: 'Admin',
    isInfo: true,
    time: Date.now(),
  });

  IO.in(roomName).emit(events.ROOM_INFO, getStats(roomName));

  notify(userId, {
    type: 'success',
    message: 'The user has been promoted to admin!',
  });
};

const ackLeave = (data, socket) => {
  const { id: userId } = socket;

  const roomName = getUser(userId, 'activeRoom');

  socket.leave(roomName);
};

const handlerMap = {
  [userActions.BAN_USER]: { callback: handleUserBan },
  [userActions.KICK_USER]: { callback: handleUserKick },
  [userActions.REPORT_USER]: { forAnyone: true, callback: handleUserReport },
  [userActions.PROMOTE_USER]: { callback: handleUserPromote },
};

const userActionHandler = (data, socket) => {
  const { id: userId } = socket;

  const { action, user: forUser, ...props } = data;

  const handler = handlerMap[action];

  if (!handler.forAnyone && !isAdmin(userId)) {
    notify(userId, {
      type: 'warning',
      message: "You aren't authorized to perform this action!",
    });
  }

  handler.callback(forUser, socket, props);
};

export { userActionHandler as userActions, ackLeave };
