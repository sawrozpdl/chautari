import { useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import {
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';

import {
  AUTH_APP_ACCOUNT_URL,
  AUTH_APP_LOGIN_URL,
  AUTH_APP_REGISTER_URL,
} from '../../constants/endpoints';
import toast from '../../utils/toast';
import SmartAvatar from '../SmartAvatar';
import routes from '../../constants/routes';
import { GUEST } from '../../constants/app';
import { redirectTo } from '../../utils/url';
import { getHashAvatar } from '../../utils/user';
import useSettings from '../../hooks/useSettings';
import * as authService from '../../services/auth';
import { extractInitials } from '../../utils/string';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(1),
  },
  popover: {
    width: 200,
  },
}));

const Account = (props: any): any => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const { settings } = useSettings();

  const { user, onLogout } = props;

  const classes: any = useStyles();

  const isRegisteredUser = Boolean(user.id);

  const { username } = user;

  const handleLogout = async (): Promise<void> => {
    try {
      await authService.logout(username);
      onLogout();
      history.push(routes.APP);
      toast.success('Logout successful!');
    } catch (error) {
      toast.error('Unknown error occurred!');
    }
  };

  const renderUserMenuItems = (): any => (
    <div>
      {' '}
      <MenuItem onClick={redirectTo(AUTH_APP_ACCOUNT_URL, true)}>
        Account
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </div>
  );

  const renderGuestMenuItems = (): any => (
    <>
      {' '}
      <MenuItem onClick={redirectTo(AUTH_APP_LOGIN_URL)}>Login</MenuItem>
      <MenuItem onClick={redirectTo(AUTH_APP_REGISTER_URL)}>Register</MenuItem>
    </>
  );

  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  useEffect(() => {
    setAvatarUrl(
      user.avatarUrl || settings.nickname !== GUEST
        ? getHashAvatar({ name: settings.nickname })
        : null
    );
  }, [user.avatarUrl, settings.nickname]);

  return user ? (
    <div>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
      >
        <SmartAvatar
          alt="User"
          className={classes.avatar}
          size={32}
          src={avatarUrl}
        >
          {extractInitials(user, false) || 'A'}
        </SmartAvatar>
        <Hidden smDown>
          <Typography variant="h5" color="inherit">
            {settings.nickname}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        {isRegisteredUser ? renderUserMenuItems() : renderGuestMenuItems()}
      </Menu>
    </div>
  ) : (
    <div></div>
  );
};

export default Account;
