import { useContext } from 'react';
import SettingsContext from '../context/SettingsContext';

const useSettings = (): any => {
  const context: any = useContext(SettingsContext);

  return context;
};

export default useSettings;
