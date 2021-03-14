import React from 'react';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles,
} from '@material-ui/core';

import toast from '../../utils/toast';
import routes from '../../constants/routes';
import { redirectTo } from '../../utils/url';
import * as authService from '../../services/auth';
import { extractFullName, extractInitials } from '../../utils/string';
import {
  AUTH_APP_ACCOUNT_URL,
  AUTH_APP_LOGIN_URL,
  AUTH_APP_REGISTER_URL,
} from '../../constants/endpoints';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1),
  },
  popover: {
    width: 200,
  },
}));

const Account = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const history = useHistory();

  const { user, onLogout } = props;

  const classes: any = useStyles();

  if (!user) return <div />;

  const isRegisteredUser = user.id !== -1;

  const { username } = user;

  const handleLogout = async () => {
    try {
      await authService.logout(username);
      onLogout();
      history.push(routes.APP);
      toast.success('Logout successful!');
    } catch (error) {
      toast.error('Unknown error occurred!');
    }
  };

  const renderUserMenuItems = () => (
    <>
      {' '}
      <MenuItem onClick={redirectTo(AUTH_APP_ACCOUNT_URL, true)}>
        Account
      </MenuItem>
      <MenuItem component={RouterLink} to={routes.SETTINGS}>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </>
  );

  const renderGuestMenuItems = () => (
    <>
      {' '}
      <MenuItem onClick={redirectTo(AUTH_APP_LOGIN_URL)}>Login</MenuItem>
      <MenuItem onClick={redirectTo(AUTH_APP_REGISTER_URL)}>Register</MenuItem>
      <MenuItem component={RouterLink} to={routes.SETTINGS}>
        Settings
      </MenuItem>
    </>
  );

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
      >
        <Avatar alt="User" className={classes.avatar} src={user.avatarUrl}>
          {extractInitials(user, false) || 'A'}
        </Avatar>
        <Hidden smDown>
          <Typography variant="h6" color="inherit">
            {extractFullName(user, false)}
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
    </>
  );
};

export default Account;
