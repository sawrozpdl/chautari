import toast from '../utils/toast';
import { authorizeUser } from '../services/auth';

export const fetchUser = async (callback?: any): Promise<any> => {
  let user = null;
  try {
    const activeUser = await authorizeUser();
    if (activeUser) {
      user = activeUser;
    }
  } catch (err) {
    toast.info('Login for a better experience!');
  }
  if (callback) callback(user);
  else return user;
};
