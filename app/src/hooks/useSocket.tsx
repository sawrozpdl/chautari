import { useEffect, useState } from 'react';

import { io } from 'socket.io-client';

import {
  MAX_RECONNECTION_ATTEMPTS,
  MAX_RECONNECTION_DELAY,
} from '../constants/socket';
import { get } from '../utils/storage';
import { NATIVE } from '../constants/url';

const useSocket = (url: string): any => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    setSocket(
      io(url, {
        transports: ['websocket'],
        reconnectionAttempts: MAX_RECONNECTION_ATTEMPTS,
        reconnectionDelayMax: MAX_RECONNECTION_DELAY,
        auth: {
          token: get('accessToken'),
        },
        query: {
          ref: NATIVE,
        },
      })
    );
  }, [url]);

  return socket;
};

export default useSocket;
