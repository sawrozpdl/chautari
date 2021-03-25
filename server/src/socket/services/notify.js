import IO from '../../socket';
import { events } from '../../constants/socket';

export const notify = (userId, data) => {
  IO.to(userId).emit(events.PRIVATE_MESSAGE, data);
};
