import { getRooms } from '../models/room';
import { commonStrings } from '../../utils/string';

const filterRooms = (filter, publicOnly = true) => {
  return getRooms(
    filter
      ? (room) => {
          let relevancy = 0;

          if (filter.roomName && room.roomName.includes(filter.roomName)) {
            relevancy++;
          }

          if (filter.maxUsers && +room.maxUsers === +filter.maxUsers) {
            relevancy++;
          }

          if (filter.topics) {
            relevancy += commonStrings(room.topics, filter.topics).length;
          }

          return relevancy;
        }
      : undefined,
    Boolean(filter.roomName || filter.maxUsers || filter.topics),
    publicOnly
  );
};

export { filterRooms };
