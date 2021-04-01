import React, { createContext, useState } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';
import { syncSettings } from '../services/user';
import { storeSettings } from '../utils/settings';
import { defaultSettings } from '../constants/defaults';

const SettingsContext = createContext({});

export const SettingsProvider = (props: any): any => {
  const { settings, children } = props;
  const [currentSettings, setCurrentSettings] = useState(
    settings || defaultSettings
  );

  const setSettings = async (
    newSettings = {},
    syncToDb?: boolean
  ): Promise<void> => {
    setCurrentSettings(newSettings);
    storeSettings(newSettings);

    if (syncToDb) {
      await syncSettings(newSettings);
    }
  };

  const putSettings = async (
    newSettings = {},
    syncToDb = false
  ): Promise<void> => {
    await setSettings({ ...newSettings, timestamp: Date.now() }, syncToDb);
  };

  // Modifies the settings based on a callback function.
  const changeSettings = async (
    callback: any = (obj: any): any => obj
  ): Promise<void> => {
    const newSettings = await callback(settings);

    await setSettings(newSettings);
  };

  // Updates the new changes in the settings.
  const handleSettingsUpdate = async (
    newSettings: any,
    syncToDb?: boolean
  ): Promise<void> => {
    if (typeof newSettings === 'function') {
      await changeSettings(newSettings);
    } else {
      await putSettings(newSettings, syncToDb);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleSettingsUpdate,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.object,
};

export default SettingsContext;
