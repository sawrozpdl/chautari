import http from '../utils/http';
import toast from '../utils/toast';
import { interpolate } from '../utils/string';
import { authorizeUser } from '../services/auth';
import { SELF_SETTINGS_URL, USER_SETTINGS_URL } from '../constants/endpoints';

export const fetchUser = async (
  callback?: any,
  callbackCallback?: any
): Promise<any> => {
  let user = null;
  try {
    const activeUser = await authorizeUser();
    if (activeUser) {
      user = activeUser;
    }
  } catch (err) {
    toast.info('Login for a better experience!');
  }
  if (callback) callback(user, callbackCallback);
  else return user;
};

export const fetchSettings = async (userId: number): Promise<any> => {
  const { data: settings } = await http.get(
    userId ? interpolate(USER_SETTINGS_URL, { id: userId }) : SELF_SETTINGS_URL
  );

  return settings;
};

export const syncSettings = async (
  settings: any,
  userId?: number
): Promise<any> => {
  const {
    data: { data: updatedSettings },
  } = await http.put(
    userId ? interpolate(USER_SETTINGS_URL, { id: userId }) : SELF_SETTINGS_URL,
    { body: settings }
  );

  return updatedSettings;
};
