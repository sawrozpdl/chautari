import roles from '../constants/roles';
import UnauthorizedError from '../errors/UnauthorizedError';
import { getSettingsForUser, syncSettingsForUser } from '../services/settings';

const getUserSettings = async (req, res, next) => {
  const { currentUser } = req;

  const { id } = req.params;

  const isForSelf = id === 'self';

  if (!isForSelf && !currentUser.activeRoles.includes(roles.ADMIN)) {
    return next(new UnauthorizedError({}));
  }

  const settings = await getSettingsForUser(isForSelf ? currentUser.id : id);

  return res.json({ data: settings });
};

const syncUserSettings = async (req, res, next) => {
  const { currentUser } = req;

  const { id } = req.params;

  const isForSelf = id === 'self';

  if (!isForSelf && !currentUser.activeRoles.includes(roles.ADMIN)) {
    return next(new UnauthorizedError({}));
  }

  const newSettings = await syncSettingsForUser(
    isForSelf ? currentUser.id : id,
    req.body
  );

  return res.json({ data: newSettings });
};

export { getUserSettings, syncUserSettings };
