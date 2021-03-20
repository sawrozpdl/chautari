import toast from './toast';
import { defaultSettings } from '../constants/defaults';

export const restoreSettings = (): any => {
  let settings = defaultSettings;

  try {
    const storedData = localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    } else {
      localStorage.setItem('settings', JSON.stringify(defaultSettings));
    }
  } catch (err) {
    toast.info('Failed to load settings!');
  }

  return settings;
};

export const storeSettings = (settings: any): void => {
  localStorage.setItem('settings', JSON.stringify(settings));
};
