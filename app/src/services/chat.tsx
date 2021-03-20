import http from '../utils/http';
import { ROOMS_URL, ROOM_USERS_URL } from '../constants/endpoints';
import { interpolate } from '../utils/string';

export const fetchRooms = async (params: any): Promise<any> => {
  const { data: rooms } = await http.get(ROOMS_URL, { params });

  return rooms;
};

export const fetchUsersInARoom = async (roomId: any): Promise<any> => {
  const { data: users } = await http.get(
    interpolate(ROOM_USERS_URL, { roomId })
  );

  return users;
};
