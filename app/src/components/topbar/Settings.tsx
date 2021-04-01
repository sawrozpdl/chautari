import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton, SvgIcon, Tooltip } from '@material-ui/core';

import routes from '../../constants/routes';

const Settings = (): any => {
  return (
    <>
      <Tooltip title="Settings">
        <IconButton color="inherit" component={RouterLink} to={routes.SETTINGS}>
          <SvgIcon fontSize="small">
            <SettingsIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    </>
  );
};

export default Settings;
