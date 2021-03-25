import { updateUser } from '../models/user';
import { deleteRoom, getRoom } from '../models/room';

export const leaveRoomForUser = (roomName, userId, callback) => {
  if (!roomName) return;

  const room = getRoom(roomName);

  if (!room) return;

  room.users = room.users.filter((roomUserId) => roomUserId !== userId);

  if (!room.users.length) {
    deleteRoom(roomName);
  }

  updateUser(userId, {
    activeRoom: null,
    status: userStatus.IDLE,
  });

  if (callback) callback();
};
