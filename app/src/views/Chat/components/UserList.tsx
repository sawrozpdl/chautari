import React from 'react';

import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import BlockIcon from '@material-ui/icons/Block';
import EjectIcon from '@material-ui/icons/Eject';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import ReportIcon from '@material-ui/icons/Report';
import { getHashAvatar } from '../../../utils/user';
import { userOptions } from '../../../constants/app';
import { GenericMoreButton } from '../../../components';
import SmartAvatar from '../../../components/SmartAvatar';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  content: {
    padding: 0,
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

const baseOptions = {
  [userOptions.REPORT]: ReportIcon,
};

const adminOptions = {
  [userOptions.MAKE_ADMIN]: KeyboardArrowUpIcon,
  [userOptions.KICK]: EjectIcon,
  [userOptions.BAN]: BlockIcon,
};

const UserList = (props: any): any => {
  const { className, users, adminTools = false, ...rest } = props;

  const classes: any = useStyles();

  const options = {
    ...baseOptions,
    ...(adminTools && adminOptions),
  };

  const handleOptionClick = (option: string, value: any): void => {
    switch (option) {
      case userOptions.REPORT:
        break;
      case userOptions.MAKE_ADMIN:
        break;
      case userOptions.KICK:
        break;
      case userOptions.BAN:
        break;
      default:
        break;
    }
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Users" subtitle={`${users.length} in total`} />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {users.map((userObj: any, index: number) => (
            <ListItem divider={index < users.length - 1} key={index}>
              <SmartAvatar
                alt="User"
                className={classes.avatar}
                size={32}
                src={getHashAvatar({ name: userObj.nickname, size: 32 })}
              >
                {userObj.nickname.charAt(0)}
              </SmartAvatar>
              <ListItemText
                primary={userObj.nickname}
                secondary={`Joined ${moment(userObj.joinedAt).fromNow()}`}
              />
              <GenericMoreButton
                value={userObj.id}
                options={options}
                onOptionClick={handleOptionClick}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Divider />
    </Card>
  );
};

UserList.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  adminTools: PropTypes.bool,
};

export default UserList;
