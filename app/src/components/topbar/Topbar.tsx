import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  capitalize,
} from '@material-ui/core';

import Logo from '../Logo';
import Account from './Account';
import config from '../../config';
import Settings from './Settings';
import routes from '../../constants/routes';
import THEMES from '../../constants/themes';
import UserContext from '../../context/UserContext';

const useStyles = makeStyles((theme: any) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.main,
        }
      : {}),
    ...(theme.name === THEMES.DARK
      ? {
          backgroundColor: theme.palette.background.default,
        }
      : {}),
  },
  logoName: { marginLeft: theme.spacing(1) },
  toolbar: {
    minHeight: 64,
  },
}));

const Topbar = (props: any): any => {
  const { className, ...rest } = props;
  const userCtx: any = useContext(UserContext);
  const { user, logout } = userCtx;

  const appName = config.app.name;

  const classes: any = useStyles();
  return (
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to={routes.APP}>
          <Logo />
        </RouterLink>
        <Typography variant="h3" className={classes.logoName}>
          {appName && capitalize(appName)}
        </Typography>
        <Box ml={2} flexGrow={1} />
        <Settings />
        <Box ml={2}>
          <Account user={user} onLogout={logout} appName={appName} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
