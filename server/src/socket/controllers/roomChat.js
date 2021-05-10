import IO from '../../socket';
import logger from '../../utils/logger';
import { notify } from '../services/notify';
import Notification from '../models/notification';
import { updateUser, getUser } from '../models/user';
import { leaveRoomForUser } from '../services/roomChat';
import {
  deleteRoom,
  getRoom,
  buildRoom,
  getStats,
  roomExists,
  isBannedInRoom,
} from '../models/room';
import { events, messageTypes, userStatus } from '../../constants/socket';

export const createRoom = (data, socket) => {
  const { id: userId } = socket;

  const { roomName, maxUsers, key, topics, isPrivate = true } = data;

  const duplicateName = roomExists(roomName);

  if (duplicateName) {
    return IO.to(userId).emit(events.ROOM_CREATION_FAILED, {
      text: `Oh no, someone already chose the name ${roomName}!`,
    });
  }

  const created = buildRoom(roomName, {
    users: [],
    maxUsers,
    key,
    topics,
    admin: userId,
    isPrivate,
    bannedIPs: [],
    createdAt: Date.now(),
  });

  IO.to(userId).emit(events.ROOM_CREATED, created);
};

export const requestJoin = (data, socket, params, callback) => {
  const { id: userId } = socket;

  const { roomName, key: enteringKey } = data;

  const room = getRoom(roomName);

  const notification = new Notification(userId)
    .on(events.JOIN_REQUEST_REJECTED)
    .as(messageTypes.ERROR)
    .from(data?.requestId);

  const hasError = notification.switch({
    'You wanna join void? *loads gun*': !roomName,
    "Aye, that room doesn't exist lol": !room,
    'You have been banned from this room!': isBannedInRoom(
      roomName,
      getUser(userId, 'ip')
    ),
    "That key ain't right, I am calling 911":
      room && room.key && room.key !== enteringKey,
    'You are already in this room!': room && room.users.includes(userId),
    'Too late bro, this room is full!':
      room && room.users.length >= room.maxUsers,
  });

  if (hasError) {
    return notification.send();
  }

  if (callback) callback(userId, roomName);
  else {
    IO.to(userId).emit(events.JOIN_REQUEST_ACCEPTED, data);
  }
};

export const joinRoom = (data, socket) => {
  requestJoin(data, socket, {}, (userId, roomName) => {
    const room = getRoom(roomName);
    room.users.push({ userId, joinedAt: Date.now() });
    updateUser(userId, { activeRoom: roomName, status: userStatus.IN_ROOM });
    socket.join(roomName);

    if (!room.isRandom) {
      socket.to(roomName).emit(events.MESSAGE, {
        data: `${getUser(userId, 'nickname')} has joined the room.`,
        user: 'Admin',
        isInfo: true,
        time: Date.now(),
      });
    }

    IO.in(roomName).emit(events.ROOM_INFO, getStats(roomName));
  });
};

export const leaveRoom = (data, socket) => {
  const { id: userId } = socket;
  const roomName = getUser(userId, 'activeRoom');

  leaveRoomForUser(roomName, userId, (roomDeleted = false) => {
    socket.leave(roomName);

    if (!roomDeleted) {
      socket.to(roomName).emit(events.MESSAGE, {
        data: `${getUser(userId, 'nickname')} has left the room.`,
        user: 'Admin',
        isInfo: true,
        time: Date.now(),
      });

      socket.to(roomName).emit(events.ROOM_INFO, getStats(roomName));
    }
  });
};
