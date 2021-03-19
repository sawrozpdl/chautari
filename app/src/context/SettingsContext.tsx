import React, { createContext, useState } from 'react';

import PropTypes from 'prop-types';

import _ from 'lodash';
import { storeSettings } from '../utils/settings';
import { defaultSettings } from '../constants/defaults';

const SettingsContext = createContext({});

export const SettingsProvider = (props: any): any => {
  const { settings, children } = props;
  const [currentSettings, setCurrentSettings] = useState(
    settings || defaultSettings
  );

  const handleSettingsUpdate = (newSettings = {}): void => {
    const mergedSettings = _.merge({}, currentSettings, newSettings);

    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
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
