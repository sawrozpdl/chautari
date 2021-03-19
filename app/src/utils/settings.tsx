import toast from './toast';
import { defaultSettings } from '../constants/defaults';

export const restoreSettings = () => {
  let settings = defaultSettings;

  try {
    const storedData = localStorage.getItem('settings');

    if (storedData) {
      settings = JSON.parse(storedData);
    }
  } catch (err) {
    toast.info('Failed to load settings!');
  }

  return settings;
};

export const storeSettings = (settings: any) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};
