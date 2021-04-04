import { getPublicUserInfo, getUser, users } from './user';

const rooms = {};

export const getRoom = (roomName) => {
  return rooms[roomName];
};

export const roomExists = (roomName) => {
  return roomName in rooms;
};

export const buildRoom = (roomName, settings) => {
  rooms[roomName] = settings;

  return settings;
};

export const deleteRoom = (name) => {
  delete rooms[name];
};

export const removeUserFromRoom = (roomName, userId) => {
  rooms[roomName].users.filter((curUserId) => curUserId !== userId);
};

export const getUsers = (roomName) => {
  return rooms[roomName].users.map(getPublicUserInfo);
};

export const getStats = (roomName) => {
  return roomName
    ? {
        ...rooms[roomName],
        users: getUsers(roomName),
      }
    : {
        totalRooms: Object.keys(rooms).length,
      };
};
