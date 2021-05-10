import logger from './logger';
import { messageTypes } from '../constants/socket';
import { notify } from '../socket/services/notify';
import { isBanned } from '../socket/models/server';

export const handle = (controller, socket, props = {}, validate = true) => {
  const { id: userId, request } = socket;
  const { remoteAddress: ip } = request.connection;

  return (data) => {
    try {
      if (validate && isBanned(ip)) {
        notify(userId, {
          type: 'error',
          message: 'You have been banned from the server!',
          noAccess: true,
          requestId: data?.requestId,
        });
      } else {
        controller(data, socket, props);
      }
    } catch (E) {
      logger.error(E);

      throw E; // For debug

      return notify(userId, {
        type: messageTypes.ERROR,
        message: 'Internal server error!',
        requestId: data?.requestId,
      });
    }
  };
};
