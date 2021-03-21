import { GUEST } from '../constants/app';
import { names } from '../constants/names';

export const getPublicSettings = (settings: any, user: any): any => {
  const { privateMode } = settings;

  return {
    ...settings,
    user: privateMode ? { ageGroup: user.ageGroup } : user,
  };
};

export const getRandomName = (): string =>
  names[Math.floor(Math.random() * names.length)];

export const getHashAvatar = (params: any): string => {
  const { name = GUEST, size = 50, set = 5, bg = 1 } = params;

  return `https://robohash.org/set_set${set}/bgset_bg${bg}/${name}?size=${size}x${size}`;
};
