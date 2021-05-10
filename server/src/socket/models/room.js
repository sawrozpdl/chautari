import { getPublicUserInfo, getUser, users } from './user';

const rooms = {};

export const getRoom = (roomName, key) => {
  return key ? rooms[roomName][key] : rooms[roomName];
};

export const updateRoom = (roomName, roomData) => {
  const room = rooms[roomName];
  if (!room) {
    return false;
  }

  rooms[roomName] = { ...room, ...roomData };
};

export const patchRoom = (roomName, key, value) => {
  const room = rooms[roomName];
  if (!room) {
    return false;
  }

  room[key] = value;

  return true;
};

export const getRooms = (callback, relevantOnly = true, publicOnly = true) => {
  if (!callback || typeof callback !== 'function') {
    return rooms;
  }

  const filtered = [];
  Object.keys(rooms).forEach((roomName) => {
    const room = rooms[roomName];

    room.roomName = roomName;

    if (publicOnly && room.isPrivate) {
      return;
    }

    const relevancy = callback(room);

    room.relevancy = relevancy;

    if (!relevantOnly || Boolean(relevancy)) {
      filtered.push(room);
    }
  });

  return filtered;
};

export const joinRoom = (roomName, userId) => {
  rooms[roomName].users.push({ userId, joinedAt: Date.now() });
};

export const roomExists = (roomName) => {
  return roomName in rooms;
};

export const banIPInRoom = (roomName, ip) => {
  const room = rooms[roomName];

  if (room?.bannedIPs) {
    room.bannedIPs.push(ip);
  }
};

export const isBannedInRoom = (roomName, ip) => {
  const room = rooms[roomName];

  return room?.bannedIPs?.includes(ip);
};

export const buildRoom = (roomName, settings) => {
  rooms[roomName] = settings;

  return settings;
};

export const deleteRoom = (name) => {
  delete rooms[name];
};

export const removeUserFromRoom = (roomName, userId) => {
  rooms[roomName].users.filter((userObj) => userObj.userId !== userId);
};

export const getUsers = (roomName) => {
  return rooms[roomName].users.map(getPublicUserInfo);
};

export const getStats = (roomName) => {
  return roomName
    ? {
        roomName,
        ...rooms[roomName],
        users: getUsers(roomName),
      }
    : {
        totalRooms: Object.keys(rooms).length,
      };
};
