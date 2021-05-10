import IO from '../../socket';
import { getServerStats } from './stat';
import { events } from '../../constants/socket';
import { filterRooms } from '../services/fetch';

export const fetchPublicRooms = (data, socket) => {
  const { id: userId } = socket;

  IO.to(userId).emit(events.PUBLIC_ROOM_LIST, {
    rooms: filterRooms(data),
  });
};

export const fetchServerInfo = (data, socket) => {
  const { id: userId } = socket;

  IO.to(userId).emit(events.SERVER_INFO, getServerStats());
};
