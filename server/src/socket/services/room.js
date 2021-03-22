export const rooms = {};

export const createRoom = (name, settings) => {
  rooms[name] = settings;
};

export const deleteRoom = (name) => {
  delete rooms[name];
};

export const getStats = () => {
  return {
    totalRooms: Object.keys(rooms).length,
  };
};
