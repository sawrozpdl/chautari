import React, { useMemo, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import {
  Container,
  Grid,
  Avatar,
  makeStyles,
  Box,
  Typography,
} from '@material-ui/core';

import toast from '../../utils/toast';
import UserList from './components/UserList';
import Messenger from '../../services/message';
import LockIcon from '@material-ui/icons/Lock';
import { roomInfoObj } from '../../mocks/room';
import { events } from '../../constants/socket';
import { ChatArea, RoomInfo } from './components';
import PublicIcon from '@material-ui/icons/Public';
import { interpolate, parseQuery } from '../../utils/string';
import routes, { roomOptions } from '../../constants/routes';

const RoomChat: React.FC<any> = (props: any) => {
  const {
    className,
    history,
    socket,
    settings,
    match,
    location,
    ...rest
  } = props;
  const useStyles = makeStyles((theme: any) => ({}));

  const classes: any = useStyles();

  const [roomInfo, setRoomInfo] = useState<any>(roomInfoObj);
  const [messages, setMessages] = useState<Array<any>>([]);

  const isAdmin = socket.id === roomInfo.admin;

  const query = useMemo(() => parseQuery(location.search), [location.search]);
  const messenger = useMemo((): any => new Messenger(socket, settings), [
    socket,
    settings,
  ]);

  const { name: roomName } = match.params;
  const { key } = query;

  const handleBackClick = (): void => {
    if (history.length > 0) {
      history.push(
        interpolate(routes.ROOM_OPTION, { option: roomOptions.JOIN })
      );
    } else history.goBack();
  };

  const leaveChat = (): void => {
    socket.emit(events.LEAVE_ROOM, {});
  };

  const joinChat = (): void => {
    socket.emit(events.JOIN_ROOM, { roomName, key });
  };

  useEffect(() => {
    joinChat();

    socket.on(events.MESSAGE, (data: any) => {
      setMessages((messages) => [...messages, data]);
    });

    socket.on(events.ROOM_INFO, (info: any) => {
      setRoomInfo(info);
    });

    socket.on(events.JOIN_REQUEST_REJECTED, (data: any) => {
      toast.error(data?.text || 'Join request rejected!');

      handleBackClick();
    });

    return (): void => {
      leaveChat();

      socket.off(events.MESSAGE);
      socket.off(events.ROOM_INFO);
    };
  }, []);

  const handleMessageSend = (message: string, callback: any): void => {
    messenger.text(message).md(true);

    setMessages((messages) => [...messages, messenger.self(true).build()]);

    messenger.self(false).send();

    if (callback) {
      callback();
    }
  };

  return (
    <div className={className} {...rest}>
      <Container maxWidth="xl">
        <Grid
          container
          style={{ height: '80vh', marginTop: '24px' }}
          spacing={2}
        >
          <Grid item lg={3} xs={12}>
            {roomInfo && (
              <RoomInfo
                info={roomInfo}
                adminTools={isAdmin}
                onLeave={handleBackClick}
              />
            )}
          </Grid>
          <Grid item lg={6} xs={12}>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '12px',
                position: 'relative',
              }}
            >
              {roomInfo && roomInfo.roomName && (
                <div>
                  {' '}
                  <Box display="flex" alignItems="center">
                    <Avatar style={{ width: 32, height: 32 }}>
                      {roomInfo.isPrivate ? <LockIcon /> : <PublicIcon />}
                    </Avatar>
                    <Typography
                      variant="h5"
                      color="inherit"
                      style={{ marginLeft: '10px' }}
                    >
                      {roomInfo.roomName}
                    </Typography>
                  </Box>
                </div>
              )}
            </div>
            <ChatArea
              messages={messages}
              censor={settings.safeMode}
              onSend={handleMessageSend}
              socket={socket}
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            {roomInfo?.users && (
              <UserList users={roomInfo.users} adminTools={isAdmin} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

RoomChat.propTypes = {
  className: PropTypes.string,
  user: PropTypes.any,
  match: PropTypes.any,
};

export default RoomChat;
