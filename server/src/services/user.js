import config from '../config';

export const fetchUser = async (token, callback) => {
  const { data: activeUser } = await http.post(AUTHENTICATE_URL, {
    headers: {
      Bearer: token,
      clientId: config.auth.api.clientId,
    },
  });

  if (callback) callback(activeUser);
  else return activeUser;
};
