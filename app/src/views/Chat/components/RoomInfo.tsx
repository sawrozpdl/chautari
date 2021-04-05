import React from 'react';
import clsx from 'clsx';
import {
  Card,
  CardHeader,
  Typography,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  List,
  Button,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/styles';

import { listToString } from '../../../utils/string';
import { TooltipTruncate } from '../../../components';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  editBtn: {
    cursor: 'pointer',
    position: 'relative',
    top: '5px',
  },
}));

const RoomInfo = (props: any): any => {
  const { className, info, adminTools, onLeave, ...rest } = props;

  const classes: any = useStyles();

  const handleEditClick = () => {};

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        title="Room information"
        subtitle={`Created at: ${info.createdAt}`}
        action={
          adminTools && (
            <IconButton
              aria-label="Edit room"
              onClick={handleEditClick}
              className={classes.margin}
              size="small"
            >
              <EditIcon />
            </IconButton>
          )
        }
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          <ListItem divider={true}>
            <ListItemText primary={'Name: '} />
            <Typography variant="h5" color="inherit">
              {info.roomName}
            </Typography>
          </ListItem>
          {info.key && (
            <ListItem divider={true}>
              <ListItemText primary={'Key: '} />
              <Typography variant="h5" color="inherit">
                {info.key}
              </Typography>
            </ListItem>
          )}
          <ListItem divider={true}>
            <ListItemText primary={'Visibility: '} />
            <Typography variant="h5" color="inherit">
              {info.isPrivate ? 'Private' : 'Public'}
            </Typography>
          </ListItem>
          <ListItem divider={true}>
            <ListItemText primary={'Users: '} />
            <Typography variant="h5" color="inherit">
              {info.users.length}
              {'/'} {info.maxUsers}
            </Typography>
          </ListItem>
          <ListItem divider={true}>
            <ListItemText primary={'Topics: '} />
            <TooltipTruncate
              max={50}
              text={listToString(info.topics)}
              variant="h5"
              color="inherit"
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="secondary"
          size="small"
          variant="outlined"
          onClick={onLeave}
        >
          <ExitToAppIcon style={{ marginRight: '4px' }} /> {'Leave room '}
        </Button>
      </CardActions>
      <Divider />
    </Card>
  );
};

export default RoomInfo;
