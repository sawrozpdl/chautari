import IO from '../../socket';
import { events } from '../../constants/socket';
import { filterRooms } from '../services/fetch';
import { getStats as getRoomStats } from '../models/room';
import { getStats as getUserStats } from '../models/user';

export const fetchPublicRooms = (data, socket) => {
  const { id: userId } = socket;

  IO.to(userId).emit(events.PUBLIC_ROOM_LIST, {
    rooms: filterRooms(data),
  });
};

export const fetchServerInfo = (data, socket) => {
  const { id: userId } = socket;

  IO.to(userId).emit(events.SERVER_INFO, {
    rooms: getRoomStats(),
    users: getUserStats(),
  });
};
