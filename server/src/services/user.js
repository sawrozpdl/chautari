import config from '../config';
import { http } from '../utils/http';
import { AUTHENTICATE_URL } from '../constants/endpoints';

export const fetchUser = async (token, callback) => {
  const { data: activeUser } = await http.post(
    AUTHENTICATE_URL,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        clientId: config.auth.api.clientId,
      },
    }
  );

  if (callback) callback(activeUser);
  else return activeUser;
};
