import IO from '../../socket';
import { events } from '../../constants/socket';

export const notify = (userId, data, event = events.PRIVATE_MESSAGE) => {
  IO.to(userId).emit(event, data);
};
