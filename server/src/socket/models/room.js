import { getUser, users } from './user';

const rooms = {};

export const getRoom = (name) => {
  return rooms[name];
};

export const createRoom = (name, settings) => {
  rooms[name] = settings;
};

export const deleteRoom = (name) => {
  delete rooms[name];
};

export const removeUserFromRoom = (room, userId) => {
  rooms[room].users.filter((curUserId) => curUserId !== userId);
};

export const getStats = (roomName) => {
  return roomName
    ? {
        users: rooms[roomName].users.map((userId) =>
          getUser(userId, 'nickname')
        ),
      }
    : {
        totalRooms: Object.keys(rooms).length,
      };
};
