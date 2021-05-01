import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';

import {
  Container,
  Typography,
  Card,
  Input,
  List,
  Link,
  ListItem,
  Checkbox,
  ListItemText,
  TextField,
  CardHeader,
  FormControlLabel,
  CardContent,
  CardActions,
  Divider,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

import toast from '../../utils/toast';
import { events } from '../../constants/socket';
import { TooltipTruncate } from '../../components';
import { useDebounce, useSettings } from '../../hooks';
import routes, { roomOptions } from '../../constants/routes';
import { interpolate, listToString } from '../../utils/string';

const RoomList: React.FC<any> = (props: any) => {
  const { className, history, socket, ...rest } = props;
  const useStyles = makeStyles((theme: any) => ({
    root: {
      height: '100%',
      paddingTop: '40px',
    },
    card: {
      paddingTop: '20px',
    },
    cardContent: {
      maxHeight: '600px',
      overflowY: 'scroll',
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    iconButton: {
      padding: '8px',
    },
    filterArea: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }));

  const classes: any = useStyles();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const fetchRooms = (): void => {
    toast.info('Requesting public room list!');

    socket.emit(events.FETCH_PUBLIC_ROOM_LIST, filters);
  };

  useDebounce(fetchRooms, 1000, [filters]);

  const goToChat = (room: any): void => {
    let toGo = interpolate(routes.ROOM_CHAT, { name: room.roomName });
    if (room.key) {
      toGo += `?key=${room.key}`;
    }
    history.push(toGo);
  };

  useEffect(() => {
    socket.on(events.PUBLIC_ROOM_LIST, (res: any) => {
      toast.info('Public room list updated!');

      setLoading(false);
      setRooms(res.rooms);
    });

    socket.on(events.JOIN_REQUEST_ACCEPTED, (room: any) => {
      toast.success('Join request accepted!');

      setLoading(false);
      goToChat(room);
    });

    socket.on(events.JOIN_REQUEST_REJECTED, (data: any) => {
      toast.error(data?.text || 'Join request rejected!');

      setLoading(false);
    });

    return (): void => {
      socket.off(events.JOIN_REQUEST_ACCEPTED);
      socket.off(events.JOIN_REQUEST_REJECTED);
      socket.off(events.PUBLIC_ROOM_LIST);
    };
  }, []);

  const handleBackClick = (): void => {
    history.goBack();
  };

  const handleRefreshClick = (): void => {
    fetchRooms();

    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };

  const handleRequestJoin = (room: any): void => {
    socket.emit(events.REQUEST_JOIN, room);

    setLoading(true);

    toast.info('Join request sent!');
  };

  const getMetaInfo = (room: any): any => (
    <>
      <Typography variant="body2">
        {`Created: ${moment(room.createdAt).fromNow()}`}{' '}
      </Typography>
      <Typography variant="body2">
        {`Users: ${room.users.length} / ${room.maxUsers}`}{' '}
      </Typography>
      {room.topics?.length ? (
        <TooltipTruncate
          max={50}
          text={`Topics: ${listToString(room.topics)}`}
          variant="body2"
          color="inherit"
        />
      ) : (
        <></>
      )}
    </>
  );

  const { settings } = useSettings();

  const toggleInterestSync = (): void => {
    if (filters.topics) {
      const newFilters = { ...filters };
      delete newFilters.topics;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, topics: settings.interests });
    }
  };

  const toggleMaxUsersSync = (): void => {
    if (filters.maxUsers) {
      const newFilters = { ...filters };
      delete newFilters.maxUsers;
      setFilters(newFilters);
    } else {
      setFilters({ ...filters, maxUsers: 5 });
    }
  };

  const handleFilterChange = (key: string, value: any): void => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <Container component="main" maxWidth="md" className={classes.root}>
      <div className={classes.content}>
        <Button
          variant="outlined"
          onClick={handleBackClick}
          className={classes.backBtn}
          color="secondary"
        >
          Back
        </Button>
      </div>
      <div>
        <Card {...rest} className={clsx(classes.card, className)}>
          <CardHeader
            subtitle={`${rooms.length} in total`}
            title={'Public Rooms'}
            action={
              <Button
                color="primary"
                size="small"
                variant="outlined"
                disabled={loading}
                onClick={handleRefreshClick}
              >
                Refresh
              </Button>
            }
          />
          <Divider />
          <CardContent className={classes.filterArea}>
            <TextField
              label={`Room name`}
              name="roomName"
              onChange={(event: any): void => {
                handleFilterChange('roomName', event.target.value);
              }}
              type="text"
              value={filters.roomName || ''}
              size="small"
              variant="outlined"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.topics}
                  onChange={toggleInterestSync}
                  name="interestSync"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              }
              label="Based on my interests"
            />
            <div>
              <Checkbox
                checked={filters.maxUsers}
                onChange={toggleMaxUsersSync}
                style={{ marginRight: '-16px' }}
                name="interestSync"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <FormControlLabel
                control={
                  <Input
                    value={filters.maxUsers || 0}
                    margin="dense"
                    disabled={!filters.maxUsers}
                    style={{ margin: '0px 16px' }}
                    onChange={(event: any): void => {
                      handleFilterChange('maxUsers', event.target.value);
                    }}
                    inputProps={{
                      min: 2,
                      max: 12,
                      step: 1,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                }
                labelPlacement={'start'}
                label="Max users:"
              />
            </div>
          </CardContent>
          <Divider />
          <CardContent className={classes.cardContent}>
            <List>
              {rooms.length ? (
                rooms.map((room: any, i: number) => (
                  <ListItem divider={i < rooms.length - 1} key={room.id}>
                    <ListItemText
                      primary={room.roomName}
                      secondary={<div>{getMetaInfo(room)}</div>}
                    />
                    <IconButton
                      edge="end"
                      size="small"
                      disabled={loading}
                      className={classes.iconButton}
                    >
                      {'Join'}
                      <KeyboardArrowRightOutlinedIcon
                        onClick={(): void => handleRequestJoin(room)}
                      />
                    </IconButton>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" style={{ textAlign: 'center' }}>
                  {`No rooms at this moment, go and create one yourself from `}{' '}
                  <Link
                    component={RouterLink}
                    to={interpolate(routes.ROOM_OPTION, {
                      option: roomOptions.CREATE,
                    })}
                  >
                    {'here!'}
                  </Link>
                </Typography>
              )}
            </List>
          </CardContent>
          <Divider />
          <CardActions className={classes.actions}>
            <Button color="primary" size="small" variant="text" disabled={true}>
              <ArrowLeftIcon /> Previous
            </Button>
            <Typography variant="body2">{`Page 1 of 1`} </Typography>
            <Button color="primary" size="small" variant="text" disabled={true}>
              Next <ArrowRightIcon />
            </Button>
          </CardActions>
        </Card>
      </div>
    </Container>
  );
};

RoomList.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default RoomList;
