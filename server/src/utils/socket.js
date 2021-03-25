import logger from './logger';
import { messageTypes } from '../constants/socket';
import { notify } from '../socket/services/notify';

export const handle = (controller, socket) => {
  const { id: userId } = socket;
  return (data) => {
    try {
      controller(data, socket);
    } catch (E) {
      logger.error(E);

      throw E; // For debug

      return notify(userId, {
        type: messageTypes.ERROR,
        text: 'Internal server error!',
        requestId: data?.requestId,
      });
    }
  };
};
